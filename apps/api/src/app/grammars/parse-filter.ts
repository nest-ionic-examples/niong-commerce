import {
  AndExprContext,
  BetweenExprContext,
  ContainsExprContext,
  EndsWithExprContext,
  EqualExprContext,
  FilterParser,
  GetExprContext,
  GtExprContext,
  LetExprContext,
  LtExprContext,
  NeExprContext,
  OrExprContext,
  ParenthesisExprContext,
  StartsWithExprContext,
  ValueContext
} from './FilterParser';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { FilterLexer } from './FilterLexer';
import { FilterVisitor } from './FilterVisitor';

class FilterVisitorImpl extends AbstractParseTreeVisitor<any> implements FilterVisitor<any> {

  visitEqualExpr(ctx: EqualExprContext) {
    return {[ctx.identifier().text]: this.visitValue(ctx.value())};
  }

  visitStartsWithExpr(ctx: StartsWithExprContext) {
    return {[ctx.identifier().text]: {$regex: new RegExp('^' + ctx.value().text, 'i')}};
  }

  visitEndsWithExpr(ctx: EndsWithExprContext) {
    return {[ctx.identifier().text]: {$regex: new RegExp(ctx.value().text + '$', 'i')}};
  }

  visitContainsExpr(ctx: ContainsExprContext) {
    return {[ctx.identifier().text]: {$regex: new RegExp(ctx.value().text, 'i')}};
  }

  visitGetExpr(ctx: GetExprContext) {
    return {[ctx.identifier().text]: {$get: Number(ctx.value().text)}};
  }

  visitLetExpr(ctx: LetExprContext) {
    return {[ctx.identifier().text]: {$let: Number(ctx.value().text)}};
  }

  visitGtExpr(ctx: GtExprContext) {
    return {[ctx.identifier().text]: {$gt: Number(ctx.value().text)}};
  }

  visitLtExpr(ctx: LtExprContext) {
    return {[ctx.identifier().text]: {$lt: Number(ctx.value().text)}};
  }

  visitNeExpr(ctx: NeExprContext) {
    return {[ctx.identifier().text]: {$ne: this.visitValue(ctx.value())}};
  }

  visitBetweenExpr(ctx: BetweenExprContext) {
    return {[ctx.identifier().text]: {$get: Number(ctx.value()[0].text), $let: Number(ctx.value()[1].text)}};
  }

  visitValue(ctx: ValueContext) {
    return ctx.text;
  }

  visitOrExpr(ctx: OrExprContext) {
    const expr0 = ctx.expr()[0];
    const expr1 = ctx.expr()[1];
    const visitedExpr0 = this.visit(expr0);
    const visitedExpr1 = this.visit(expr1);
    return (ctx.parent instanceof OrExprContext)
      ? (expr0 instanceof OrExprContext)
        ? [...visitedExpr0, visitedExpr1]
        : [visitedExpr0, visitedExpr1]
      : {
        $or: (expr0 instanceof OrExprContext)
          ? [...visitedExpr0, visitedExpr1]
          : [visitedExpr0, visitedExpr1]
      };
  }

  visitAndExpr(ctx: AndExprContext) {
    const expr0 = ctx.expr()[0];
    const expr1 = ctx.expr()[1];
    const visitedExpr0 = this.visit(expr0);
    const visitedExpr1 = this.visit(expr1);
    return (ctx.parent instanceof AndExprContext)
      ? (expr0 instanceof AndExprContext)
        ? [...visitedExpr0, visitedExpr1]
        : [visitedExpr0, visitedExpr1]
      : {
        $and: (expr0 instanceof AndExprContext)
          ? [...visitedExpr0, visitedExpr1]
          : [visitedExpr0, visitedExpr1]
      };
  }

  visitParenthesisExpr(ctx: ParenthesisExprContext) {
    return this.visit(ctx.expr());
  }

  protected defaultResult(): {} {
    return {};
  }

}

export function parseFilter(filter: string) {
  const is = CharStreams.fromString(filter);
  const lexer = new FilterLexer(is);
  const ts = new CommonTokenStream(lexer);
  const parser = new FilterParser(ts);
  const tree = parser.expr();

  return new FilterVisitorImpl().visit(tree);
}
