import { Programs } from "/_internal/types/programs.js";

export interface IProgram {
    /** Name of the program. */
    name: Programs;

    /** Acquirable through creating. */
    create: {
        /** Hacking level required to create the program. */
        skill: number;

        /** Time it takes to create this program. */
        time: number;
    };

    /** Acquirable through the darkweb. */
    darkweb: {
        /** Cost to purchase the program. */
        cost: number;
    };

    /** Whether program is a port opener. */
    isOpener?: boolean;
}
