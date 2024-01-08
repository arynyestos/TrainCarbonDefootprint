// import './Header.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Header() {
    return (
        <div className="flex flex-col w-full justify-center items-center gap-y-2 mt-8">
            <div className="flex w-full justify-end items-end">
                <ConnectButton className="connect-button" chainStatus="none" showBalance={true} />
            </div>
            <div className="flex w-full justify-center items-center">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    Railway carbon  <span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">de-footprint</span>
                </h1>
            </div>
        </div>
    );
}
