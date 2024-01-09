const {
  time,
  loadFixture,
} = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const { anyValue } = require('@nomicfoundation/hardhat-chai-matchers/withArgs');
const { expect } = require('chai');
const hre = require('hardhat');

describe('CrowdFunding', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContract() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount, investor2] = await hre.ethers.getSigners();

    const CrowdFunding = await hre.ethers.getContractFactory('CrowdFunding');
    const crowdFunding = await CrowdFunding.deploy();

    return { crowdFunding, owner, otherAccount, investor2 };
  }

  describe('Deployment', function () {
    it('Should be deployed', async function () {
      const { crowdFunding } = await loadFixture(deployContract);

      expect(await crowdFunding.target).to.exist;
    });

    describe('Campaign Creation', function () {
      it('Should create a campaign', async function () {
        const { crowdFunding, otherAccount } = await loadFixture(
          deployContract
        );
        const title = 'Test Campaign';
        const description = 'This is a test campaign';
        const target = hre.ethers.parseEther('1'); // 1 ETH
        const deadline = (await time.latest()) + 3600; // 1 hour from now
        const image = 'test-image-url';

        await expect(() =>
          crowdFunding.createCampaign(
            otherAccount.address,
            title,
            description,
            target,
            deadline,
            image
          )
        ).to.changeEtherBalance(otherAccount, 0);

        const campaign = await crowdFunding.campaigns(0);
        expect(campaign.owner).to.equal(otherAccount.address);
        expect(campaign.title).to.equal(title);
        expect(campaign.description).to.equal(description);
        expect(campaign.target).to.equal(target);
        expect(campaign.deadline).to.equal(deadline);
        expect(campaign.amountCollected).to.equal(0);
        expect(campaign.image).to.equal(image);
      });
    });

    describe('Donations', function () {
      it('Should donate to a campaign', async function () {
        const { crowdFunding, owner, investor2 } = await loadFixture(
          deployContract
        );
        const campaignId = 0;
        const donationAmount = hre.ethers.parseEther('0.5'); // 0.5 ETH

        await crowdFunding.createCampaign(
          owner.address,
          'Test Campaign',
          'Description',
          donationAmount,
          9999999999,
          'image-url'
        );

        await crowdFunding
          .connect(investor2)
          .donateToCampaign(campaignId, { value: donationAmount });

        const [donators, donations] = await crowdFunding.getDonators(
          campaignId
        );
        expect(donators).to.include(investor2.address);
        expect(donations).to.include(donationAmount);
      });
    });

    describe('Campaign Retrieval', function () {
      it('Should get campaigns', async function () {
        const { crowdFunding, owner } = await loadFixture(deployContract);
        await crowdFunding.createCampaign(
          owner.address,
          'Campaign 1',
          'Description 1',
          hre.ethers.parseEther('1'),
          9999999999,
          'image-url-1'
        );
        await crowdFunding.createCampaign(
          owner.address,
          'Campaign 2',
          'Description 2',
          hre.ethers.parseEther('2'),
          9999999999,
          'image-url-2'
        );

        const allCampaigns = await crowdFunding.getCampaigns();
        expect(allCampaigns.length).to.equal(2);
        expect(allCampaigns[0].title).to.equal('Campaign 1');
        expect(allCampaigns[1].title).to.equal('Campaign 2');
      });
    });
  });
});
