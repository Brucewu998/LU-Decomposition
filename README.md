# LU-Decomposition
Using LU decomposition to solve linear equations
@example:
@

let A = mat3(2, -1, 3,
        4, 2, 5,
        1, 2, 0);
let b=[1,4,7];
let x = lu(A, b);//x = [x1, x2, x3];
