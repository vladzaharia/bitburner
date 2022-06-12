/**
 * A host that can be connected to.
 * @interface
 */
export interface IHost {
    /** Hostname of the host. */
    hostname: string;

    /** Route from "homee" to `hostname` */
    route: string[];

    /** RAM properties on this host. */
    ram: {
        /** Currently used RAM. */
        current: number;

        /** Maximum RAM on this host. */
        max: number;
    };

    /** Money properties on this host. */
    money: {
        /** Current available money. */
        current: number;

        /** Maximum money for this host. */
        max: number;
    };

    /** Security level properties on this host. */
    security: {
        /** Current security level. */
        current: number;

        /** Minimum security level for this host. */
        min: number;

        /** Minimum hacking level required to hack host. */
        hack: number;
    };

    /** Our capabilities against this host. */
    capabilities: {
        /**
         * Can crack this host.
         *
         * User has more port openers than ports needed.
         */
        crackable: boolean;

        /**
         * Can execute scripts on this host.
         */
        rooted: boolean;

        /**
         * Host can be hack()ed and backdoored.
         *
         * User's hacking level is above the minimimum.
         */
        hackable: boolean;
    };
}
