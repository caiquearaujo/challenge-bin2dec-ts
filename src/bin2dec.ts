export interface IBin2DecResponse {
	error: boolean;
	message: string;
}

export default class Bin2Dec {
	public readonly ALLOWED_CHARS = /^(?:([bd])\:)?([0-9]+)$/i;

	public input(input: string): IBin2DecResponse {
		if (input === '')
			return { error: true, message: 'You must set a value.' };

		const match = input.match(this.ALLOWED_CHARS);

		if (!match || !match[2])
			return {
				error: true,
				message: `Invalid expression for "${input}": it is not a valid number`,
			};

		return !match[1] || match[1] === 'b'
			? this._fromBin(match[2])
			: this._fromDec(match[2]);
	}

	private _fromBin(input: string): IBin2DecResponse {
		if (input.match(/[2-9]+/))
			return {
				error: true,
				message: `Invalid expression for "${input}": expecting a binary number`,
			};

		return { error: false, message: `decimal(${parseInt(input, 2)})` };
	}

	private _fromDec(input: string): IBin2DecResponse {
		return { error: false, message: `binary(${parseInt(input, 10)})` };
	}
}
