// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WikthdrawAttacker {
    uint x;
    fallback() external payable {
        // assertions used to consume all gas, but don't since Solidity 8:
        // assert(false);
        // but we can still burn all the gas if we want to:
        while (x < 1234567890987654321) {
            x = x + 1;
        }
    }
}
