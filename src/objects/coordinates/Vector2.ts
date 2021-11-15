export default class Vector2 {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    distanceTo(vector: Vector2): number {
        return Math.sqrt(
            Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2)
        )
    }

    normalize(): Vector2 {
        const x = this.x === 0 ? 0 : this.x / Math.abs(this.x)
        const y = this.y === 0 ? 0 : this.y / Math.abs(this.y)
        return new Vector2(x, y)
    }

    sum(vector: Vector2): Vector2 {
        return new Vector2(this.x + vector.x, this.y + vector.y)
    }

    sub(vector: Vector2): Vector2 {
        return new Vector2(this.x - vector.x, this.y - vector.y)
    }

    multiplyConstant(cnt: number): Vector2 {
        return new Vector2(this.x * cnt, this.y * cnt)
    }

    multiply(vector: Vector2): Vector2 {
        return new Vector2(this.x * vector.x, this.y * vector.y)
    }

    oposite(): Vector2 {
        return new Vector2(-this.x, -this.y)
    }
}
