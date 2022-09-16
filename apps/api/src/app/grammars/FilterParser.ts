// Generated from src/grammars/Filter.g4 by ANTLR 4.7.3-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { FilterVisitor } from "./FilterVisitor";


export class FilterParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly IDENTIFIER = 18;
	public static readonly VALUE = 19;
	public static readonly STRING = 20;
	public static readonly RULE_expr = 0;
	public static readonly RULE_identifier = 1;
	public static readonly RULE_value = 2;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"expr", "identifier", "value",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'&'", "'||'", "'|'", "'='", "'^='", "'$='", "'*='", "'<=>'", 
		"','", "'>='", "'<='", "'>'", "'<'", "'!='", "'!('", "')'", "'('",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, "IDENTIFIER", "VALUE", "STRING",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(FilterParser._LITERAL_NAMES, FilterParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return FilterParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "Filter.g4"; }

	// @Override
	public get ruleNames(): string[] { return FilterParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return FilterParser._serializedATN; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(FilterParser._ATN, this);
	}
	public expr(): ExprContext;
	public expr(_p: number): ExprContext;
	// @RuleVersion(0)
	public expr(_p?: number): ExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExprContext = new ExprContext(this._ctx, _parentState);
		let _prevctx: ExprContext = _localctx;
		let _startState: number = 0;
		this.enterRecursionRule(_localctx, 0, FilterParser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 57;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				{
				_localctx = new EqualExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 7;
				this.identifier();
				this.state = 8;
				this.match(FilterParser.T__3);
				this.state = 9;
				this.value();
				}
				break;

			case 2:
				{
				_localctx = new StartsWithExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 11;
				this.identifier();
				this.state = 12;
				this.match(FilterParser.T__4);
				this.state = 13;
				this.value();
				}
				break;

			case 3:
				{
				_localctx = new EndsWithExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 15;
				this.identifier();
				this.state = 16;
				this.match(FilterParser.T__5);
				this.state = 17;
				this.value();
				}
				break;

			case 4:
				{
				_localctx = new ContainsExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 19;
				this.identifier();
				this.state = 20;
				this.match(FilterParser.T__6);
				this.state = 21;
				this.value();
				}
				break;

			case 5:
				{
				_localctx = new BetweenExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 23;
				this.identifier();
				this.state = 24;
				this.match(FilterParser.T__7);
				this.state = 25;
				this.value();
				this.state = 26;
				this.match(FilterParser.T__8);
				this.state = 27;
				this.value();
				}
				break;

			case 6:
				{
				_localctx = new GetExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 29;
				this.identifier();
				this.state = 30;
				this.match(FilterParser.T__9);
				this.state = 31;
				this.value();
				}
				break;

			case 7:
				{
				_localctx = new LetExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 33;
				this.identifier();
				this.state = 34;
				this.match(FilterParser.T__10);
				this.state = 35;
				this.value();
				}
				break;

			case 8:
				{
				_localctx = new GtExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 37;
				this.identifier();
				this.state = 38;
				this.match(FilterParser.T__11);
				this.state = 39;
				this.value();
				}
				break;

			case 9:
				{
				_localctx = new LtExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 41;
				this.identifier();
				this.state = 42;
				this.match(FilterParser.T__12);
				this.state = 43;
				this.value();
				}
				break;

			case 10:
				{
				_localctx = new NeExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 45;
				this.identifier();
				this.state = 46;
				this.match(FilterParser.T__13);
				this.state = 47;
				this.value();
				}
				break;

			case 11:
				{
				_localctx = new NotExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 49;
				this.match(FilterParser.T__14);
				this.state = 50;
				this.expr(0);
				this.state = 51;
				this.match(FilterParser.T__15);
				}
				break;

			case 12:
				{
				_localctx = new ParenthesisExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 53;
				this.match(FilterParser.T__16);
				this.state = 54;
				this.expr(0);
				this.state = 55;
				this.match(FilterParser.T__15);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 67;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 65;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
					case 1:
						{
						_localctx = new AndExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, FilterParser.RULE_expr);
						this.state = 59;
						if (!(this.precpred(this._ctx, 14))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 14)");
						}
						this.state = 60;
						_la = this._input.LA(1);
						if (!(_la === FilterParser.T__0 || _la === FilterParser.T__1)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 61;
						this.expr(15);
						}
						break;

					case 2:
						{
						_localctx = new OrExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, FilterParser.RULE_expr);
						this.state = 62;
						if (!(this.precpred(this._ctx, 13))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 13)");
						}
						this.state = 63;
						this.match(FilterParser.T__2);
						this.state = 64;
						this.expr(14);
						}
						break;
					}
					}
				}
				this.state = 69;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifier(): IdentifierContext {
		let _localctx: IdentifierContext = new IdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, FilterParser.RULE_identifier);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 70;
			this.match(FilterParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public value(): ValueContext {
		let _localctx: ValueContext = new ValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, FilterParser.RULE_value);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 72;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << FilterParser.IDENTIFIER) | (1 << FilterParser.VALUE) | (1 << FilterParser.STRING))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 0:
			return this.expr_sempred(_localctx as ExprContext, predIndex);
		}
		return true;
	}
	private expr_sempred(_localctx: ExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 14);

		case 1:
			return this.precpred(this._ctx, 13);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x16M\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x03\x02\x03\x02\x03\x02\x03\x02\x03" +
		"\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03" +
		"\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03" +
		"\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03" +
		"\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03" +
		"\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03" +
		"\x02\x03\x02\x05\x02<\n\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03" +
		"\x02\x07\x02D\n\x02\f\x02\x0E\x02G\v\x02\x03\x03\x03\x03\x03\x04\x03\x04" +
		"\x03\x04\x02\x02\x03\x02\x05\x02\x02\x04\x02\x06\x02\x02\x04\x03\x02\x03" +
		"\x04\x03\x02\x14\x16\x02V\x02;\x03\x02\x02\x02\x04H\x03\x02\x02\x02\x06" +
		"J\x03\x02\x02\x02\b\t\b\x02\x01\x02\t\n\x05\x04\x03\x02\n\v\x07\x06\x02" +
		"\x02\v\f\x05\x06\x04\x02\f<\x03\x02\x02\x02\r\x0E\x05\x04\x03\x02\x0E" +
		"\x0F\x07\x07\x02\x02\x0F\x10\x05\x06\x04\x02\x10<\x03\x02\x02\x02\x11" +
		"\x12\x05\x04\x03\x02\x12\x13\x07\b\x02\x02\x13\x14\x05\x06\x04\x02\x14" +
		"<\x03\x02\x02\x02\x15\x16\x05\x04\x03\x02\x16\x17\x07\t\x02\x02\x17\x18" +
		"\x05\x06\x04\x02\x18<\x03\x02\x02\x02\x19\x1A\x05\x04\x03\x02\x1A\x1B" +
		"\x07\n\x02\x02\x1B\x1C\x05\x06\x04\x02\x1C\x1D\x07\v\x02\x02\x1D\x1E\x05" +
		"\x06\x04\x02\x1E<\x03\x02\x02\x02\x1F \x05\x04\x03\x02 !\x07\f\x02\x02" +
		"!\"\x05\x06\x04\x02\"<\x03\x02\x02\x02#$\x05\x04\x03\x02$%\x07\r\x02\x02" +
		"%&\x05\x06\x04\x02&<\x03\x02\x02\x02\'(\x05\x04\x03\x02()\x07\x0E\x02" +
		"\x02)*\x05\x06\x04\x02*<\x03\x02\x02\x02+,\x05\x04\x03\x02,-\x07\x0F\x02" +
		"\x02-.\x05\x06\x04\x02.<\x03\x02\x02\x02/0\x05\x04\x03\x0201\x07\x10\x02" +
		"\x0212\x05\x06\x04\x022<\x03\x02\x02\x0234\x07\x11\x02\x0245\x05\x02\x02" +
		"\x0256\x07\x12\x02\x026<\x03\x02\x02\x0278\x07\x13\x02\x0289\x05\x02\x02" +
		"\x029:\x07\x12\x02\x02:<\x03\x02\x02\x02;\b\x03\x02\x02\x02;\r\x03\x02" +
		"\x02\x02;\x11\x03\x02\x02\x02;\x15\x03\x02\x02\x02;\x19\x03\x02\x02\x02" +
		";\x1F\x03\x02\x02\x02;#\x03\x02\x02\x02;\'\x03\x02\x02\x02;+\x03\x02\x02" +
		"\x02;/\x03\x02\x02\x02;3\x03\x02\x02\x02;7\x03\x02\x02\x02<E\x03\x02\x02" +
		"\x02=>\f\x10\x02\x02>?\t\x02\x02\x02?D\x05\x02\x02\x11@A\f\x0F\x02\x02" +
		"AB\x07\x05\x02\x02BD\x05\x02\x02\x10C=\x03\x02\x02\x02C@\x03\x02\x02\x02" +
		"DG\x03\x02\x02\x02EC\x03\x02\x02\x02EF\x03\x02\x02\x02F\x03\x03\x02\x02" +
		"\x02GE\x03\x02\x02\x02HI\x07\x14\x02\x02I\x05\x03\x02\x02\x02JK\t\x03" +
		"\x02\x02K\x07\x03\x02\x02\x02\x05;CE";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!FilterParser.__ATN) {
			FilterParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(FilterParser._serializedATN));
		}

		return FilterParser.__ATN;
	}

}

export class ExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FilterParser.RULE_expr; }
	public copyFrom(ctx: ExprContext): void {
		super.copyFrom(ctx);
	}
}
export class AndExprContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: FilterVisitor<Result>): Result {
		if (visitor.visitAndExpr) {
			return visitor.visitAndExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class OrExprContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: FilterVisitor<Result>): Result {
		if (visitor.visitOrExpr) {
			return visitor.visitOrExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EqualExprContext extends ExprContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: FilterVisitor<Result>): Result {
		if (visitor.visitEqualExpr) {
			return visitor.visitEqualExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StartsWithExprContext extends ExprContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: FilterVisitor<Result>): Result {
		if (visitor.visitStartsWithExpr) {
			return visitor.visitStartsWithExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EndsWithExprContext extends ExprContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: FilterVisitor<Result>): Result {
		if (visitor.visitEndsWithExpr) {
			return visitor.visitEndsWithExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ContainsExprContext extends ExprContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: FilterVisitor<Result>): Result {
		if (visitor.visitContainsExpr) {
			return visitor.visitContainsExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BetweenExprContext extends ExprContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public value(): ValueContext[];
	public value(i: number): ValueContext;
	public value(i?: number): ValueContext | ValueContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ValueContext);
		} else {
			return this.getRuleContext(i, ValueContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: FilterVisitor<Result>): Result {
		if (visitor.visitBetweenExpr) {
			return visitor.visitBetweenExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class GetExprContext extends ExprContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: FilterVisitor<Result>): Result {
		if (visitor.visitGetExpr) {
			return visitor.visitGetExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LetExprContext extends ExprContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: FilterVisitor<Result>): Result {
		if (visitor.visitLetExpr) {
			return visitor.visitLetExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class GtExprContext extends ExprContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: FilterVisitor<Result>): Result {
		if (visitor.visitGtExpr) {
			return visitor.visitGtExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LtExprContext extends ExprContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: FilterVisitor<Result>): Result {
		if (visitor.visitLtExpr) {
			return visitor.visitLtExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NeExprContext extends ExprContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: FilterVisitor<Result>): Result {
		if (visitor.visitNeExpr) {
			return visitor.visitNeExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NotExprContext extends ExprContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: FilterVisitor<Result>): Result {
		if (visitor.visitNotExpr) {
			return visitor.visitNotExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenthesisExprContext extends ExprContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: FilterVisitor<Result>): Result {
		if (visitor.visitParenthesisExpr) {
			return visitor.visitParenthesisExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(FilterParser.IDENTIFIER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FilterParser.RULE_identifier; }
	// @Override
	public accept<Result>(visitor: FilterVisitor<Result>): Result {
		if (visitor.visitIdentifier) {
			return visitor.visitIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ValueContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(FilterParser.IDENTIFIER, 0); }
	public VALUE(): TerminalNode | undefined { return this.tryGetToken(FilterParser.VALUE, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(FilterParser.STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FilterParser.RULE_value; }
	// @Override
	public accept<Result>(visitor: FilterVisitor<Result>): Result {
		if (visitor.visitValue) {
			return visitor.visitValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


