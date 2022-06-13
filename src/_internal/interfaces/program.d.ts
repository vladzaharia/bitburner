import { Programs } from "/_internal/types/programs.js";

export interface IProgram {
    /** Name of the program. */
    name: Programs;

    /** Hacking level required to create the program. */
    hack: number;

    /** Cost to purchase the program. */
    cost: number;

    /** Whether program is a port opener. */
    isOpener?: boolean;
}
