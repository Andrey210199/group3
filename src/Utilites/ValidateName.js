
export default function validateName(name) {
    return !/[/,.\\№%[]{}&$\^<>#@!\?()]/g.test(name);
}