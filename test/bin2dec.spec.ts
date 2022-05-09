import Bin2Dec from '../src/ts/bin2dec';

describe('bin2dec engine', () => {
	it('throw error when input is empty string', () => {
		expect(new Bin2Dec().input('')).toStrictEqual({
			error: true,
			message: 'You must set a value.',
		});
	});

	const regexDataSet = [
		{ input: 'a', error: true },
		{ input: 'b', error: true },
		{ input: 'b:', error: true },
		{ input: 'd:', error: true },
		{ input: 'abc215', error: true },
		{ input: '215abc', error: true },
		{ input: 'b:1001', error: false },
		{ input: 'b:2457', error: true },
		{ input: 'd:2586', error: false },
		{ input: '100011', error: false },
		{ input: '257478', error: true },
	];

	it.each(regexDataSet)(
		'can validate $input and throw error as $error',
		({ input, error }) => {
			expect(new Bin2Dec().input(input).error).toBe(error);
		}
	);

	it('can validate regex', () => {});
});
