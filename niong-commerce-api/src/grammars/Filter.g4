grammar Filter;

expr
  : expr ('&' | '||') expr            # AndExpr
  | expr '|' expr                     # OrExpr
  | identifier '=' value              # EqualExpr
  | identifier '^=' value             # StartsWithExpr
  | identifier '$=' value             # EndsWithExpr
  | identifier '*=' value             # ContainsExpr
  | identifier '<=>' value ',' value  # BetweenExpr
  | identifier '>=' value             # GetExpr
  | identifier '<=' value             # LetExpr
  | identifier '>' value              # GtExpr
  | identifier '<' value              # LtExpr
  | identifier '!=' value             # NeExpr
  | '!(' expr ')'                     # NotExpr
  | '(' expr ')'                      # ParenthesisExpr
  ;

identifier : IDENTIFIER ;

IDENTIFIER : [A-Za-z_$][A-Za-z0-9_]* | [A-Za-z_$][A-Za-z0-9_.$]*[A-Za-z0-9_] ;

value : IDENTIFIER | VALUE | STRING ;

VALUE : [ a-zA-Z0-9_.:-]+ ;

STRING : '"' (ESC | ~[\\"])*? '"' ;
fragment ESC : '\\"' | '\\\\' ;
