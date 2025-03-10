const Footer = () => {
  const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground p-4 mt-auto">
      <div className="container mx-auto">
        <p className="text-center">∃ugenio © {currentYear}</p>
      </div>
    </footer>
  )
}