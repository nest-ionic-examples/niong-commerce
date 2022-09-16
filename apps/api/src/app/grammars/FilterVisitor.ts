// Generated from src/grammars/Filter.g4 by ANTLR 4.7.3-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { AndExprContext } from "./FilterParser";
import { OrExprContext } from "./FilterParser";
import { EqualExprContext } from "./FilterParser";
import { StartsWithExprContext } from "./FilterParser";
import { EndsWithExprContext } from "./FilterParser";
import { ContainsExprContext } from "./FilterParser";
import { BetweenExprContext } from "./FilterParser";
import { GetExprContext } from "./FilterParser";
import { LetExprContext } from "./FilterParser";
import { GtExprContext } from "./FilterParser";
import { LtExprContext } from "./FilterParser";
import { NeExprContext } from "./FilterParser";
import { NotExprContext } from "./FilterParser";
import { ParenthesisExprContext } from "./FilterParser";
import { ExprContext } from "./FilterParser";
import { IdentifierContext } from "./FilterParser";
import { ValueContext } from "./FilterParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `FilterParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface FilterVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `AndExpr`
	 * labeled alternative in `FilterParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAndExpr?: (ctx: AndExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `OrExpr`
	 * labeled alternative in `FilterParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrExpr?: (ctx: OrExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `EqualExpr`
	 * labeled alternative in `FilterParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEqualExpr?: (ctx: EqualExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `StartsWithExpr`
	 * labeled alternative in `FilterParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStartsWithExpr?: (ctx: StartsWithExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `EndsWithExpr`
	 * labeled alternative in `FilterParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEndsWithExpr?: (ctx: EndsWithExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `ContainsExpr`
	 * labeled alternative in `FilterParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContainsExpr?: (ctx: ContainsExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `BetweenExpr`
	 * labeled alternative in `FilterParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBetweenExpr?: (ctx: BetweenExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `GetExpr`
	 * labeled alternative in `FilterParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGetExpr?: (ctx: GetExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `LetExpr`
	 * labeled alternative in `FilterParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLetExpr?: (ctx: LetExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `GtExpr`
	 * labeled alternative in `FilterParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGtExpr?: (ctx: GtExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `LtExpr`
	 * labeled alternative in `FilterParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLtExpr?: (ctx: LtExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `NeExpr`
	 * labeled alternative in `FilterParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNeExpr?: (ctx: NeExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `NotExpr`
	 * labeled alternative in `FilterParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNotExpr?: (ctx: NotExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `ParenthesisExpr`
	 * labeled alternative in `FilterParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenthesisExpr?: (ctx: ParenthesisExprContext) => Result;

	/**
	 * Visit a parse tree produced by `FilterParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr?: (ctx: ExprContext) => Result;

	/**
	 * Visit a parse tree produced by `FilterParser.identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier?: (ctx: IdentifierContext) => Result;

	/**
	 * Visit a parse tree produced by `FilterParser.value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue?: (ctx: ValueContext) => Result;
}

