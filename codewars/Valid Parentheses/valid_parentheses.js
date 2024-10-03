function validParentheses(s) {
    const stack = [];
    const parentheses = { ')' : '(' }

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            if (stack.length === 0 || stack.pop() !== parentheses[char]) {
                return false;
            }
        }
    }

    return stack.length == 0;
}