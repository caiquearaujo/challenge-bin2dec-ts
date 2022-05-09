import Bin2Dec from './bin2dec';
import { TOrNull } from './types';

export type TRenderColor = 'green' | 'blue' | 'white' | 'red';

export default class RenderEngine {
	private _wrapper: HTMLElement;
	private _currentInput: TOrNull<HTMLInputElement>;
	public lib: Bin2Dec;

	constructor(id: string) {
		const wrapper = document.getElementById(id);
		if (!wrapper) throw new Error('Wrapper element must exist in DOM...');

		this._wrapper = wrapper;
		this._currentInput = null;
		this.lib = new Bin2Dec();

		this.append(this._line('Starting typing a number below...'));
	}

	public append(el: HTMLElement): void {
		this._wrapper.appendChild(el);
	}

	private _handlerKeyUp(e: KeyboardEvent) {
		if (!this._currentInput) return;

		const key = e.key || e.keyCode;

		if (key === 'Enter' || key === 13) {
			const value = this._currentInput.value;
			const solve = this.lib.input(value);

			this._inputToLine(this._currentInput.parentElement, value);

			this.append(
				this._line(solve.message, solve.error ? 'red' : 'blue')
			);
			this.append(this._input());

			this._currentInput.focus();
		}
	}

	private _input(): HTMLDivElement {
		const line = document.createElement('div');
		line.className = `ln white`;

		const input = document.createElement('input');
		input.type = 'text';
		input.addEventListener('keyup', this._handlerKeyUp.bind(this));

		line.appendChild(this._mark());
		line.appendChild(input);

		this._currentInput = input;
		return line;
	}

	private _inputToLine(parent: TOrNull<HTMLElement>, content: string) {
		if (!this._currentInput || !parent) return;

		parent.removeChild(this._currentInput);
		parent.appendChild(this._content(content));

		this._currentInput = null;
	}

	private _line(
		content: string,
		color: TRenderColor = 'green'
	): HTMLDivElement {
		const line = document.createElement('div');
		line.className = `ln ${color}`;

		line.appendChild(this._mark());
		line.appendChild(this._content(content));

		return line;
	}

	private _content(content: string): HTMLSpanElement {
		const el = document.createElement('span');
		el.className = 'content';
		el.textContent = content;
		return el;
	}

	private _mark(): HTMLSpanElement {
		const el = document.createElement('span');
		el.className = 'mark';
		el.textContent = '$gt;';
		return el;
	}
}