import TableForm from '../components/TableForm'

export default function Home() {
  return (
    <main className="container">
      <TableForm />
      <div className="text-center w-full">Powered by <span className="text-teal-400 font-medium hover:font-semibold"><a href="mailto:a.gutierrez@g-npd.com">Candela y Alex</a></span></div>
    </main>
  );
}
