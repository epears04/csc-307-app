import mut from "./module.js"; //MUT = Module Under Test

test('Testing sum -- success', () => {
    const expected = 30;
    const got = mut.sum(12, 18);
    expect(got).toBe(expected);
});

// DIV TEST CASES
test('Testing div -- throws divide by zero error', () => {
    expect(() => {
        mut.div(12, 0);
    }).toThrow('Cannot divide by zero');
});

test('Testing div -- test integer division', () => {
    const expected = 5;
    const got = mut.div(20, 4);
    expect(got).toBe(expected);
});

test('Testing div -- test fraction division', () => {
    const expected = 0.5;
    const got = mut.div(0.1, 0.2);
    expect(got).toBe(expected);
});

test('Testing div -- negative number division', () => {
    const expected = -5;
    const got = mut.div(10, -2);
    expect(got).toBe(expected);
});

// CONTAINSNUMBER TEST CASES
test('Testing containsNumbers -- contains number', () => {
    const expected = true;
    const got = mut.containsNumbers("hell0");
    expect(got).toBe(expected);
});

test('Testing containsNumbers -- multiple numbers', () => {
    const got = mut.containsNumbers("code:1842");
    expect(got).toBe(true);
});

test('Testing containsNumbers -- no numbers', () => {
    const got = mut.containsNumbers("Hello");
    expect(got).toBe(false);
});

test('Testing containsNumbers -- only numbers', () => {
    const got = mut.containsNumbers("184924");
    expect(got).toBe(true);
});

test('Testing containsNumbers -- empty string', () => {
    const got = mut.containsNumbers("");
    expect(got).toBe(false);
});
