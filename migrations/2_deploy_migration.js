const E_contract = artifacts.require("E_contract");

module.exports = function(deployer) {
  deployer.deploy(E_contract);
};