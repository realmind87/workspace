
export type ButtonTypes = {
    type: "submit" | "reset" | "button",
    onHandler?: () => void,
    text?: string,
    className?: string,
    icon?: React.ReactNode,
}