export const findLongestChain = (fragments) => {
    function findPath(fragment) {
        const visited = new Set();
        const stack = [fragment];
        const path = [fragment];

        while (stack.length > 0) {
            const currentFragment = stack.pop();
            visited.add(currentFragment);
            const lastTwo = currentFragment.slice(-2);
            const nextFragments = fragments.filter(fragment =>
                fragment !== currentFragment && fragment.startsWith(lastTwo)
            );

            for (const nextFragment of nextFragments) {
                if (!visited.has(nextFragment)) {
                    stack.push(nextFragment);
                    path.push(nextFragment);
                }
            }
        }
        return path;
    }

    let longestOverall = [];
    const totalFragments = fragments.length;

    for (const startFragment of fragments) {
        const path = findPath(startFragment);
        if (path.length > longestOverall.length) {
            longestOverall = path;}
    }

    return longestOverall;
};
