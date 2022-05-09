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

	const convertDataSet = [
		{ input: '1001001011', response: 'decimal(587)' },
		{ input: '0000101100', response: 'decimal(44)' },
		{ input: '0110011011', response: 'decimal(411)' },
		{ input: '1100100001', response: 'decimal(801)' },
		{ input: '0110000010', response: 'decimal(386)' },
		{ input: '0000010110', response: 'decimal(22)' },
		{ input: '1001101000', response: 'decimal(616)' },
		{ input: '1100000010', response: 'decimal(770)' },
		{ input: '1110001010', response: 'decimal(906)' },
		{ input: '0100101110', response: 'decimal(302)' },
		{ input: 'b:00111001010110011100', response: 'decimal(234908)' },
		{ input: 'b:10110001001101001001', response: 'decimal(725833)' },
		{ input: 'b:10100010010011010110', response: 'decimal(664790)' },
		{ input: 'b:01110111100011011011', response: 'decimal(489691)' },
		{ input: 'b:10000001110011011011', response: 'decimal(531675)' },
		{ input: 'b:10100111000011110001', response: 'decimal(684273)' },
		{ input: 'b:00100011000001111001', response: 'decimal(143481)' },
		{ input: 'b:01000111011000001010', response: 'decimal(292362)' },
		{ input: 'b:00001111011010110011', response: 'decimal(63155)' },
		{ input: 'b:00001101011001000001', response: 'decimal(54849)' },
		{ input: 'd:243039', response: 'binary(111011010101011111)' },
		{ input: 'd:731408', response: 'binary(10110010100100010000)' },
		{ input: 'd:423317', response: 'binary(1100111010110010101)' },
		{ input: 'd:252092', response: 'binary(111101100010111100)' },
		{ input: 'd:558476', response: 'binary(10001000010110001100)' },
		{ input: 'd:201531', response: 'binary(110001001100111011)' },
		{ input: 'd:872868', response: 'binary(11010101000110100100)' },
		{ input: 'd:591001', response: 'binary(10010000010010011001)' },
		{ input: 'd:165023', response: 'binary(101000010010011111)' },
		{ input: 'd:568266', response: 'binary(10001010101111001010)' },
		{
			input: 'd:20166308120',
			response: 'binary(10010110010000000010111000100011000)',
		},
		{
			input: 'd:59996197197',
			response: 'binary(110111111000000011010101000101001101)',
		},
		{
			input: 'd:31207298021',
			response: 'binary(11101000100000110011001001111100101)',
		},
		{
			input: 'd:55541388339',
			response: 'binary(110011101110100001100101010000110011)',
		},
		{
			input: 'd:76556682692',
			response: 'binary(1000111010011001000100100010111000100)',
		},
		{
			input: 'd:99425419575',
			response: 'binary(1011100100110001101111000000100110111)',
		},
		{
			input: 'd:60690291516',
			response: 'binary(111000100001011011000101101100111100)',
		},
		{
			input: 'd:24951021102',
			response: 'binary(10111001111001100100101111000101110)',
		},
		{
			input: 'd:73003972994',
			response: 'binary(1000011111111011000000011100110000010)',
		},
		{
			input: 'd:37112091220',
			response: 'binary(100010100100000011011001001001010100)',
		},
	];

	it.each(convertDataSet)(
		'can convert $input to $response',
		({ input, response }) => {
			expect(new Bin2Dec().input(input).message).toBe(response);
		}
	);
});
