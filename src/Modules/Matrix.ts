export class Matrix extends Array<number[]> {
    constructor(rows: number, cols: number);
    constructor(array?: number[][]);
    constructor(rowsOrArray?: number | number[][], cols?: number) {
        if (Array.isArray(rowsOrArray)) {
            super(...rowsOrArray);
        } else if (typeof rowsOrArray === "number") {
            super(rowsOrArray);
            for (let i = 0; i < this.length; i++) {
                this[i] = new Array(cols);
            }
        } else {
            super();
        }
        Object.setPrototypeOf(this, new.target.prototype);
    }

    get rows() {
        return this.length;
    }

    get columns() {
        return this[0].length;
    }

    get dimentions() {
        return [this.rows, this.columns];
    }

    row(n: number): number[] {
        return [...this[n]];
    }

    col(n: number): number[] {
        const newColumn = [];
        for (let i = 0; i < this.length; i++) {
            newColumn.push(this[i][n]);
        }
        return newColumn;
    }

    map2d(fn: (x: number, row: number, column: number) => number): Matrix {
        return new Matrix(this.map((row, iRow) => row.map((col, iCol) => fn(col, iRow, iCol))));
    }

    scalar(scalar: number): Matrix {
        return this.map2d((x: number) => x * scalar);
    }

    mult(mat: Matrix): Matrix {
        const [m1, m2] = [this, mat];
        if (m1.columns !== m2.rows) {
            throw Error("Не удаётся перемножить матрицы");
        }
        const newArr: number[][] = [];
        for (let i = 0; i < m1.rows; i++) {
            newArr[i] = [];
            for (let j = 0; j < m2.columns; j++) {
                newArr[i][j] = 0;
                for (let k = 0; k < m1.columns; k++) {
                    newArr[i][j] += m1[i][k] * m2[k][j];
                }
            }
        }
        return new Matrix(newArr);
    }

    add(mat: Matrix): Matrix {
        const [m1, m2] = [this, mat];
        if (m1.columns !== m2.columns || m1.rows !== m2.rows) {
            throw Error("Не удаётся сложить матрицы");
        }
        return this.map2d((_, i, j) => m1[i][j] + m2[i][j]);
    }

    sub(mat: Matrix): Matrix {
        const [m1, m2] = [this, mat];
        if (m1.columns !== m2.columns || m1.rows !== m2.rows) {
            throw Error("Не удаётся вычесть матрицы");
        }
        return this.map2d((_, i, j) => m1[i][j] - m2[i][j]);
    }

    product(mat: Matrix): Matrix {
        const [m1, m2] = [this, mat];
        if (m1.columns !== m2.columns || m1.rows !== m2.rows) {
            throw Error("Не удаётся поэлементно перемножить матрицы");
        }
        return this.map2d((_, i, j) => m1[i][j] * m2[i][j])
    }

    transpose(): Matrix {
        const newMatrix = new Matrix();
        for (let i = 0; i < this.columns; i++) {
            newMatrix[i] = [];
            for (let j = 0; j < this.rows; j++) {
                newMatrix[i][j] = this[j][i];
            }
        }
        return newMatrix;
    }
}