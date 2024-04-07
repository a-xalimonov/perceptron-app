export class Matrix {
    matrix: number[][];

    constructor(arr: number[][]) {
        this.matrix = arr;
    }

    get rows() {
        return this.matrix.length;
    }

    get columns() {
        return this.matrix[0].length;
    }

    get dimentions() {
        return [this.rows, this.columns];
    }

    row(n: number): number[] {
        const newRow = []
        for (let col of this.matrix[n]) {
            newRow.push(col);
        }
        return newRow;
    }

    col(n: number): number[] {
        const newColumn = []
        for (let row of this.matrix) {
            newColumn.push(row[n]);
        }
        return newColumn;
    }

    map(fn: (x: number, row: number, column: number) => number): Matrix {
        const newArr: number[][] = [];
        for (let i = 0; i < this.rows; i++) {
            newArr[i] = [];
            for (let j = 0; j < this.columns; j++) {
                newArr[i][j] = fn(this.matrix[i][j], i, j);
            }
        }
        return new Matrix(newArr);
    }

    scalar(scalar: number): Matrix {
        return this.map((x: number) => x * scalar);
    }

    mult(mat: Matrix): Matrix {
        const [m1, m2] = [this, mat]
        if (m1.columns !== m2.rows) {
            throw Error("Не удаётся перемножить матрицы");
        }
        const newArr: number[][] = [];
        for (let i = 0; i < m1.rows; i++) {
            newArr[i] = [];
            for (let j = 0; j < m2.columns; j++) {
                newArr[i][j] = 0;
                for (let k = 0; k < m1.columns; k++) {
                    newArr[i][j] += m1.matrix[i][k] * m2.matrix[k][j];
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
        const newArr: number[][] = [];
        for (let i = 0; i < m1.rows; i++) {
            newArr[i] = [];
            for (let j = 0; j < m1.columns; j++) {
                newArr[i][j] = m1.matrix[i][j] + m2.matrix[i][j];
            }
        }
        return new Matrix(newArr);
    }

    sub(mat: Matrix): Matrix {
        const [m1, m2] = [this, mat];
        if (m1.columns !== m2.columns || m1.rows !== m2.rows) {
            throw Error("Не удаётся вычесть матрицы");
        }
        const newArr: number[][] = [];
        for (let i = 0; i < m1.rows; i++) {
            newArr[i] = [];
            for (let j = 0; j < m1.columns; j++) {
                newArr[i][j] = m1.matrix[i][j] - m2.matrix[i][j];
            }
        }
        return new Matrix(newArr);
    }

    product(mat: Matrix): Matrix {
        const [m1, m2] = [this, mat]
        if (m1.columns !== m2.columns || m1.rows !== m2.rows) {
            throw Error("Не удаётся поэлементно перемножить матрицы");
        }
        const newArr: number[][] = [];
        for (let i = 0; i < m1.rows; i++) {
            newArr[i] = [];
            for (let j = 0; j < m2.columns; j++) {
                newArr[i][j] = m1.matrix[i][j] * m2.matrix[i][j];
            }
        }
        return new Matrix(newArr);
    }

    transpose(): Matrix {
        const newArr: number[][] = [];
        for (let i = 0; i < this.columns; i++) {
            newArr[i] = [];
            for (let j = 0; j < this.rows; j++) {
                newArr[i][j] = this.matrix[j][i];
            }
        }
        return new Matrix(newArr);
    }
}