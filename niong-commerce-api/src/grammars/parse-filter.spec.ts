import { parseFilter } from './parse-filter';

describe('Parse Filter', () => {
  it('should parse `a=b`', () => {
    const parsedFilter = parseFilter('a=b');
    expect(parsedFilter).toEqual({a: 'b'});
  });

  it('should parse `a^=b`', () => {
    const parsedFilter = parseFilter('a^=b');
    expect(parsedFilter).toEqual({a: {$regex: /^b/i}});
  });

  it('should parse `a$=b`', () => {
    const parsedFilter = parseFilter('a$=b');
    expect(parsedFilter).toEqual({a: {$regex: /b$/i}});
  });

  it('should parse `a*=b`', () => {
    const parsedFilter = parseFilter('a*=b');
    expect(parsedFilter).toEqual({a: {$regex: /b/i}});
  });

  it('should parse `a>=b`', () => {
    const parsedFilter = parseFilter('a1>=2');
    expect(parsedFilter).toEqual({a1: {$get: 2}});
  });

  it('should parse `a<=b`', () => {
    const parsedFilter = parseFilter('a1<=2');
    expect(parsedFilter).toEqual({a1: {$let: 2}});
  });

  it('should parse `a>b`', () => {
    const parsedFilter = parseFilter('a1>2');
    expect(parsedFilter).toEqual({a1: {$gt: 2}});
  });

  it('should parse `a<b`', () => {
    const parsedFilter = parseFilter('a1<2');
    expect(parsedFilter).toEqual({a1: {$lt: 2}});
  });

  it('should parse `a1!=b`', () => {
    const parsedFilter = parseFilter('a1!=a2');
    expect(parsedFilter).toEqual({a1: {$ne: 'a2'}});
  });

  it('should parse `a1<=>2,5`', () => {
    const parsedFilter = parseFilter('a1<=>2,5');
    expect(parsedFilter).toEqual({a1: {$get: 2, $let: 5}});
  });

  it('should parse `a1=b|a1=c`', () => {
    const parsedFilter = parseFilter('a1=b|a1=c');
    expect(parsedFilter).toEqual({$or: [{a1: 'b'}, {a1: 'c'}]});
  });

  it('should parse `a1=b|a1=c|a1=d`', () => {
    const parsedFilter = parseFilter('a1=b|a1=c|a1=d');
    expect(parsedFilter).toEqual({$or: [{a1: 'b'}, {a1: 'c'}, {a1: 'd'}]});
  });

  it('should parse `a1=b|a1=c|a1=d|a1=e`', () => {
    const parsedFilter = parseFilter('a1=b|a1=c|a1=d|a1=e');
    expect(parsedFilter).toEqual({$or: [{a1: 'b'}, {a1: 'c'}, {a1: 'd'}, {a1: 'e'}]});
  });

  it('should parse `a1=b|a1=c|a1=d|a1=e|a1=f`', () => {
    const parsedFilter = parseFilter('a1=b|a1=c|a1=d|a1=e|a1=f');
    expect(parsedFilter).toEqual({$or: [{a1: 'b'}, {a1: 'c'}, {a1: 'd'}, {a1: 'e'}, {a1: 'f'}]});
  });

  it('should parse `a1=b&a1=c`', () => {
    const parsedFilter = parseFilter('a1=b&a1=c');
    expect(parsedFilter).toEqual({$and: [{a1: 'b'}, {a1: 'c'}]});
  });

  it('should parse `a1=b&a1=c&a1=d`', () => {
    const parsedFilter = parseFilter('a1=b&a1=c&a1=d');
    expect(parsedFilter).toEqual({$and: [{a1: 'b'}, {a1: 'c'}, {a1: 'd'}]});
  });

  it('should parse `a1=b&a1=c&a1=d&a1=e`', () => {
    const parsedFilter = parseFilter('a1=b&a1=c&a1=d&a1=e');
    expect(parsedFilter).toEqual({$and: [{a1: 'b'}, {a1: 'c'}, {a1: 'd'}, {a1: 'e'}]});
  });

  it('should parse `a1=b&a1=c&a1=d&a1=e&a1=f`', () => {
    const parsedFilter = parseFilter('a1=b&a1=c&a1=d&a1=e&a1=f');
    expect(parsedFilter).toEqual({$and: [{a1: 'b'}, {a1: 'c'}, {a1: 'd'}, {a1: 'e'}, {a1: 'f'}]});
  });

  it('should parse `a1=b&a1=c|a1=d`', () => {
    const parsedFilter = parseFilter('a1=b&a1=c|a1=d');
    expect(parsedFilter).toEqual({$or: [{$and: [{a1: 'b'}, {a1: 'c'}]}, {a1: 'd'}]});
  });

  it('should parse `a1=b&a1=c|a1=d&a1=e`', () => {
    const parsedFilter = parseFilter('a1=b&a1=c|a1=d&a1=e');
    expect(parsedFilter).toEqual({$or: [{$and: [{a1: 'b'}, {a1: 'c'}]}, {$and: [{a1: 'd'}, {a1: 'e'}]}]});
  });

  it('should parse `a1=b|a1=c&a1=d`', () => {
    const parsedFilter = parseFilter('a1=b|a1=c&a1=d');
    expect(parsedFilter).toEqual({$or: [{a1: 'b'}, {$and: [{a1: 'c'}, {a1: 'd'}]}]});
  });

  it('should parse `a1=b|a1=c&a1=d|a1=e`', () => {
    const parsedFilter = parseFilter('a1=b|a1=c&a1=d|a1=e');
    expect(parsedFilter).toEqual({$or: [{a1: 'b'}, {$and: [{a1: 'c'}, {a1: 'd'}]}, {a1: 'e'}]});
  });

  it('should parse `a1=b&(a1=c|a1=d)`', () => {
    const parsedFilter = parseFilter('a1=b&(a1=c|a1=d)');
    expect(parsedFilter).toEqual({$and: [{a1: 'b'}, {$or: [{a1: 'c'}, {a1: 'd'}]}]});
  });

  it('should parse `(a1=b|a1=c)&a1=d`', () => {
    const parsedFilter = parseFilter('(a1=b|a1=c)&a1=d');
    expect(parsedFilter).toEqual({$and: [{$or: [{a1: 'b'}, {a1: 'c'}]}, {a1: 'd'}]});
  });

  it('should parse `a1=b|(a1=c&a1=d)`', () => {
    const parsedFilter = parseFilter('a1=b|(a1=c&a1=d)');
    expect(parsedFilter).toEqual({$or: [{a1: 'b'}, {$and: [{a1: 'c'}, {a1: 'd'}]}]});
  });

  it('should parse `(a1=b&a1=c)|a1=d`', () => {
    const parsedFilter = parseFilter('(a1=b&a1=c)|a1=d');
    expect(parsedFilter).toEqual({$or: [{$and: [{a1: 'b'}, {a1: 'c'}]}, {a1: 'd'}]});
  });

});
