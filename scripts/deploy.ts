import { task } from 'hardhat/config'
import '@nomiclabs/hardhat-ethers'
// import { UniswapV2Factory } from '../dist/types'
// import UniswapV2Pair from '../build/UniswapV2Pair.json'
import { utils } from 'ethers'
import { bytecode } from "../artifacts/contracts/UniswapV2Pair.sol/UniswapV2Pair.json";
import { Logger } from 'tslog'
import config from './config/config'

const logger: Logger = new Logger()

task('deploy-factory', 'Deploys UniswapV2Factory contract')
    .setAction(async (args, hre) => {
        const factory = await hre.ethers.getContractFactory(`contracts/UniswapV2Factory.sol:UniswapV2Factory`)
        const instance = await factory.deploy(config.feeToSetter)

        await instance.deployed()

        logger.info(instance.address)
    })

// task('get-hash', 'Get pair hash')
//     .setAction(async (args, hre) => {
//         const pairCodeHash = hre.ethers.utils.keccak256(`0x${UniswapV2Pair.evm.bytecode.object}`)
//         console.log(`Pair code hash: ${pairCodeHash}`)
//
//         // const instance = await hre.ethers.getContractAt("UniswapV2Factory", "0x05df80f2B35daB65C03B080031c520447F9cce14") as UniswapV2Factory
//
//         // const initCodeHash = await instance.pairCodeHash()
//         // logger.info(initCodeHash)
//     })

task('init-hash', '')
    .setAction(async (args, hre) => {
        logger.info(utils.keccak256(bytecode))
        logger.info(utils.solidityKeccak256(['bytes'], [bytecode]))
    });
