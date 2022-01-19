/**
 * 用于实现1-6元线性方程组求解，和矩阵的QR分解：求特征值和特征向量
 * @author: Wujinhua
 * */

function BuildArray () {
    this.Arr = [];
}
BuildArray.prototype.matrix = function(n) {
    for (let i = 0; i < n; i++) {
        let nRows = [];
        for (let j = 0; j < n; j++) {
            nRows.push(0);
        }
        this.Arr.push(nRows);
    }

    return this.Arr;
};
BuildArray.prototype.vector = function (n) {
    for (let i = 0; i < n; i++) {
        this.Arr.push(0);
    }
    return this.Arr;
};

function _argumentsToArray( args ) {
    return [].concat.apply( [], Array.prototype.slice.apply(args) );
}

/**
 * lu分解求解线性方程组
 * @param: n*n矩阵arraysA 和 n维向量arraysB
 * @example:
 * let A = [1,2,3,2,5,2,3,1,5];
 * let b = [4,18,20];
 * let x = lu(A, b);
 */

function lu(arraysA, arraysB) {

    let n = arraysA.length;
    let result1 = _argumentsToArray(arraysA);
    let A = undefined;

    if(n === 2) A = mat2(result1);//2*2矩阵
    if(n === 3) A = mat3(result1);//3*3
    if(n === 4) A = mat4(result1);//4*4
    if(n === 5) A = mat5(result1);//5*5
    if(n === 6) A = mat6(result1);//6*6

    let ll = new BuildArray();//初始化矩阵L
    let l = ll.matrix(n);
    let uu = new BuildArray();//初始化U矩阵
    let u = uu.matrix(n);


    //进行U矩阵的第一行赋值
    for (let i = 0; i < n; i++) {
        u[0][i] = A[0][i];
    }

    //进行L矩阵的第一列赋值
    for (let i = 0; i < n; i++) {
        l[i][0] = A[i][0] / u[0][0];
    }


    //
    for (let i = 1; i < n; i++) {
        for (let j = i; j < n; j++) {
            let sum1 = 0.0;
            for (let k = 0; k < i; k++) {
                sum1 += l[i][k] * u[k][j];
            }
            u[i][j] = A[i][j] - sum1;
        }

        if(i !== n) {
            for (let r = i+1; r < n; r++) {
                let sum2 = 0.0;
                for (let k = 0; k < i; k++) {
                    sum2 += l[r][k] * u[k][i];
                }

                l[r][i] = (A[r][i] - sum2) / u[i][i];
            }
        }
    }

    let y = new BuildArray();
    y.vector(n);
    y[0] = arraysB[0];

    for (let m = 0; m < n; m++) {
        let sum3 = 0.0;
        for (let k = 0; k < m; k++) {
            sum3 += l[m][k] * y[k];
            y[m] = arraysB[m] - sum3;
        }
    }

    let xx = new BuildArray();
    let x = xx.vector(n);
    x[n-1] = y[n-1] / u[n-1][n-1];
    for (let j = n - 2; j >= 0; j--) {
        let sum4 = 0.0;
        for (let k = j + 1; k < n; k++) {
            sum4 += u[j][k] * x[k];
            x[j] = (y[j] - sum4) / u[j][j];
        }
    }

    return x;
}

console.log('test1');

