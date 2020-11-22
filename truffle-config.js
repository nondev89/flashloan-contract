// const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider")
require("dotenv").config()

module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration> to customize your Truffle configuration!
	// contracts_build_directory: path.join(__dirname, "client/src/contracts"),
	networks: {
	  development: {
	    host: "192.168.1.180",
	    port: 7545,
	    // gas: 20000000,
	    network_id: "5777",
	    skipDryRun: true
	  },
	  ropsten: {
	    provider: () => new HDWalletProvider(process.env.DEPLOYMENT_ACCOUNT_KEY, "https://ropsten.infura.io/v3/" + process.env.INFURA_PROJECT_ID),
	    network_id: 3,
	    gas: 5000000,
		gasPrice: 100000000000, // 100 Gwei
		//skipDryRun: true
	  },
	  kovan: {
	    provider: () => new HDWalletProvider(process.env.DEPLOYMENT_ACCOUNT_KEY, "https://kovan.infura.io/v3/" + process.env.INFURA_PROJECT_ID),
	    network_id: 42,
	    gas: 5000000,
		gasPrice: 10000000000, // 10 Gwei
		skipDryRun: true
	  },
	  mainnet: {
	    provider: () => new HDWalletProvider(process.env.DEPLOYMENT_ACCOUNT_KEY, "https://mainnet.infura.io/v3/" + process.env.INFURA_PROJECT_ID),
	    network_id: 1,
	    gas: 5000000,
	    gasPrice: 10000000000 // 10 Gwei
	  }
	},
	compilers: {
		solc: {
			version: "^0.6.6",
		},
	},
	mocha: {
		enableTimeouts: false,
		before_timeout: 960000
	}
}
