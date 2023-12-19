const {
  time,
  loadFixture,
} = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const { anyValue } = require('@nomicfoundation/hardhat-chai-matchers/withArgs');
const { expect } = require('chai');

describe('CrowdFunding', function () {
  let CrowdFunding;
  let crowdFunding;
  let owner;
  let otherAccount;

  async function deployCrowdFundingFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const crowdFunding = await ethers.deployContract('CrowdFunding');
    await CrowdFunding.waitForDeployment();
    return { crowdFunding, owner, otherAccount };
  }

  beforeEach(async function () {
    ({ crowdFunding, owner, otherAccount } = await loadFixture(
      deployCrowdFundingFixture
    ));
  });

  describe('Campaign Creation', function () {
    it('Should create a campaign', async function () {
      const title = 'Test Campaign';
      const description = 'This is a test campaign';
      const target = ethers.utils.parseEther('1'); // 1 ETH
      const deadline = (await time.latest()) + 3600; // 1 hour from now
      const image = 'test-image-url';

      await expect(() =>
        crowdFunding.createCampaign(
          owner.address,
          title,
          description,
          target,
          deadline,
          image
        )
      ).to.changeEtherBalance(owner, target);

      const campaign = await crowdFunding.campaigns(0);
      expect(campaign.owner).to.equal(owner.address);
      expect(campaign.title).to.equal(title);
      expect(campaign.description).to.equal(description);
      expect(campaign.target).to.equal(target);
      expect(campaign.deadline).to.equal(deadline);
      expect(campaign.amountCollected).to.equal(target);
      expect(campaign.image).to.equal(image);
    });

    it('Should fail if the deadline is not in the future', async function () {
      const title = 'Invalid Deadline Campaign';
      const description = 'This campaign should fail';
      const target = ethers.utils.parseEther('1'); // 1 ETH
      const deadline = (await time.latest()) - 3600; // 1 hour ago
      const image = 'invalid-deadline-image-url';

      await expect(
        crowdFunding.createCampaign(
          owner.address,
          title,
          description,
          target,
          deadline,
          image
        )
      ).to.be.revertedWith('Deadline must be in the future');
    });
  });

  describe('Donations', function () {
    it('Should donate to a campaign', async function () {
      const campaignId = 0;
      const donationAmount = ethers.utils.parseEther('0.5'); // 0.5 ETH

      await crowdFunding.createCampaign(
        owner.address,
        'Test Campaign',
        'Description',
        donationAmount,
        9999999999,
        'image-url'
      );

      await expect(() =>
        crowdFunding
          .connect(otherAccount)
          .donateToCampaign(campaignId, { value: donationAmount })
      ).to.changeEtherBalances(
        [otherAccount, crowdFunding],
        [donationAmount.neg(), donationAmount]
      );

      const [donators, donations] = await crowdFunding.getDonators(campaignId);
      expect(donators).to.include(otherAccount.address);
      expect(donations).to.include(donationAmount);
    });
  });

  describe('Campaign Retrieval', function () {
    it('Should get campaigns', async function () {
      await crowdFunding.createCampaign(
        owner.address,
        'Campaign 1',
        'Description 1',
        ethers.utils.parseEther('1'),
        9999999999,
        'image-url-1'
      );
      await crowdFunding.createCampaign(
        owner.address,
        'Campaign 2',
        'Description 2',
        ethers.utils.parseEther('2'),
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
