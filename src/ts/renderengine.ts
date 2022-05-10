import Bin2Dec, { IBin2DecResponse } from './bin2dec';
import { TOrNull } from './types';

export type TRenderColor = 'green' | 'blue' | 'white' | 'red';

export default class RenderEngine {
	private _wrapper: HTMLElement;
	private _currentInput: TOrNull<HTMLInputElement>;
	public lib: Bin2Dec;

	/**
	 * Finds wrapper element, initializes obj props,
	 * appends the startup message, and show the first
	 * input element to user.
	 *
	 * @param {string} id The wrapper element id.
	 */
	constructor(id: string) {
		const wrapper = document.getElementById(id);
		if (!wrapper) throw new Error('Wrapper element must exist in DOM...');

		this._wrapper = wrapper;
		this._currentInput = null;
		this.lib = new Bin2Dec();

		this.append(this._line('Starting typing a number below...'));
		this._redraw();
	}

	/**
	 * Shortcut to append elements on main wrapper.
	 *
	 * @param {HTMLElement} el
	 */
	public append(el: HTMLElement): void {
		this._wrapper.appendChild(el);
	}

	/**
	 * Handle the keyup event. It will: redraw terminal
	 * data anytime user press "enter" button.
	 *
	 * @param {KeyboardEvent} e
	 * @returns {void}
	 */
	private _handlerKeyUp(e: KeyboardEvent): void {
		if (!this._currentInput) return;

		const key = e.key || e.keyCode;

		if (key === 'Enter' || key === 13) {
			const value = this._currentInput.value.toLowerCase();

			if (value === 'clear') {
				this._wrapper.replaceChildren();
				this._redraw();
				return;
			}

			this._redraw(value, this.lib.input(value));
		}
	}

	/**
	 * Redraw will:
	 *
	 * - Convert sent input data to raw text;
	 * - Convert sent input to binary/decimal format;
	 * - Add a new line with conversion result;
	 * - Add a new line with new current input.
	 *
	 * @param {TOrNull<string>} value
	 * @param {TOrNull<IBin2DecResponse>} solve
	 * @returns {void}
	 */
	private _redraw(
		value: TOrNull<string> = null,
		solve: TOrNull<IBin2DecResponse> = null
	): void {
		if (this._currentInput && value)
			this._inputToLine(this._currentInput.parentElement, value);

		if (solve)
			this.append(
				this._line(
					solve.message,
					solve.error ? '!' : '=',
					solve.error ? 'red' : 'blue'
				)
			);

		this.append(this._input());

		if (this._currentInput) this._currentInput.focus();
	}

	/**
	 * Create a input element and associate it
	 * to the current input.
	 *
	 * @returns {HTMLDivElement}
	 */
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

	/**
	 * Get current input value, remove current input
	 * element from parent e append its value as a new
	 * line with raw text.
	 *
	 * @param {TOrNull<HTMLElement>} parent
	 * @param {string} content
	 * @returns {void}
	 */
	private _inputToLine(
		parent: TOrNull<HTMLElement>,
		content: string
	): void {
		if (!this._currentInput || !parent) return;

		parent.removeChild(this._currentInput);
		parent.appendChild(this._content(content));

		this._currentInput = null;
	}

	/**
	 * Create a new line on terminal.
	 *
	 * @param {string} content
	 * @param {string} marker Default as >
	 * @param {TRenderColor} color Default as green
	 * @returns {HTMLDivElement}
	 */
	private _line(
		content: string,
		marker: string = '>',
		color: TRenderColor = 'green'
	): HTMLDivElement {
		const line = document.createElement('div');
		line.className = `ln ${color}`;

		line.appendChild(this._mark(marker));
		line.appendChild(this._content(content));

		return line;
	}

	/**
	 * Create a content element.
	 *
	 * @param {string} content
	 * @returns {HTMLSpanElement}
	 */
	private _content(content: string): HTMLSpanElement {
		const el = document.createElement('span');
		el.className = 'content';
		el.textContent = content;
		return el;
	}

	/**
	 * Create a mark element.
	 *
	 * @param {string} marker Default as >
	 * @returns {HTMLSpanElement}
	 */
	private _mark(marker: string = '>'): HTMLSpanElement {
		const el = document.createElement('span');
		el.className = 'mark';
		el.textContent = marker;
		return el;
	}
}
