export interface IBin2DecResponse {
	error: boolean;
	message: string;
}

export default class Bin2Dec {
	public readonly ALLOWED_CHARS = /^(?:([bd])\:)?([0-9]+)$/i;

	/**
	 * Parse input into a response by formatting
	 * the input value and calculating the conversion.
	 *
	 * @param {string} input
	 * @returns {IBin2DecResponse}
	 */
	public input(input: string): IBin2DecResponse {
		if (input === '')
			return { error: true, message: 'You must set a value.' };

		input = input.toLowerCase();
		const match = input.match(this.ALLOWED_CHARS);

		if (!match || !match[2])
			return {
				error: true,
				message: `Invalid expression for "${input}": it is not a valid number, type a binary number, b:<number> or d:<number>.`,
			};

		return !match[1] || match[1] === 'b'
			? this._fromBin(match[2])
			: this._fromDec(match[2]);
	}

	/**
	 * Get binary value from input and
	 * return the decimal form of it.
	 *
	 * @param {string} input
	 * @returns {IBin2DecResponse}
	 */
	private _fromBin(input: string): IBin2DecResponse {
		if (input.match(/[2-9]+/))
			return {
				error: true,
				message: `Invalid expression for "${input}": expecting a binary number, type a binary number, b:<number> or d:<number>.`,
			};

		return { error: false, message: `decimal(${parseInt(input, 2)})` };
	}

	/**
	 * Get decimal value from input and
	 * return the binary form of it.
	 *
	 * @param {string} input
	 * @returns {IBin2DecResponse}
	 */
	private _fromDec(input: string): IBin2DecResponse {
		return {
			error: false,
			message: `binary(${parseInt(input).toString(2)})`,
		};
	}
}
