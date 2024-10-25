import TableForm from '../components/TableForm'
import Image from 'next/image';


export default function Home() {
  return (
    <main className="container">
      <TableForm />
      <div className="text-center w-full">
        Powered by
        <span className="text-teal-400">
          <a href="mailto:a.gutierrez@g-npd.com"> Candela and Alex</a>
        </span>
      </div>

        {/* Flex container for GitHub icon and iframe */}
        <div className="flex items-center justify-center space-x-3 mt-5">
          <a href="https://github.com/Gnpd/irregular-verbs">
            <Image
              priority
              src="/github-mark.svg"
              height={28}
              width={28}
              alt="See this project on GitHub"
            />
          </a>
          <iframe 
            src="https://github.com/sponsors/Gnpd/button"
            title="Sponsor Gnpd" 
            height="32" 
            width="114" 
          />
        </div>
    
    </main>
  );
}
