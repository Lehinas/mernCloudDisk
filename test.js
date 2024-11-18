const addBinary = function (a, b) {
    let res = ""
    let space = 0
    //   0 1 1
    //   0 0 1
    //         =
    //   1 0 0
    let i = a.length - 1
    let j = b.length - 1
    
    while (i >= 0 || j >= 0 || space) {
        
        let bitA = a[i] - "0" || 0  // num
        let bitB = b[j] - "0" || 0
        
        let sum = bitA ^ bitB ^ space
        console.log(bitA, bitB, space, `sum: ${sum}`)
        space = (bitA & bitB) | (space & (bitA ^ bitB))
        
        res = sum + res
        i--
        j--
    }
    console.log(res)
}
addBinary("11", "1")
console.log("\n")
addBinary("1010", "1011")

const isPowerOfTwo = function (n) {
    // 1 = 0 0 0 1
    // 2 = 0 0 1 0
    // 4 = 0 1 0 0
    // 8 = 1 0 0 0
    // 7:  0 1 1 1
    // 5: 0 1 0 1
    // 16= 1 0 0 0 0
    
    // 4
    // 0 1 0 0
    // 0 0 1 1
    // 4 - 1 = 3
    
    // 8 4 2 1
    return (n & (n - 1)) == 0
    // n = 8:     1 0 0 0
   
}

isPowerOfTwo(1)
isPowerOfTwo(16)
isPowerOfTwo(3)
