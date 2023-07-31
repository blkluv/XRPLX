/**
 * This hook just accepts any transaction coming through it
 */
#include "hookapi.h"
#include <stdint.h>

// Function to generate a random number in the range [min, max]

int64_t hook(uint32_t reserved ) {
    static unsigned int seed = 12345; // Initial seed value
    seed = (1103515245 * seed + 12345) % (1 << 31); // Linear congruential generator formula
    int range = 100 - 10 + 1;
    int NFTPower = seed % range + 10;
    TRACEVAR(NFTPower);
    TRACESTR("Generate random power for NFTs");
    accept (0,0,0); 

    _g(1,1);   // every hook needs to import guard function and use it at least once
    // unreachable
    return 0;
}