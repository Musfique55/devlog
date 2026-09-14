"use client"

export function Footer() {
  return (
    <footer className="py-12 sm:py-20 bg-secondary/5 border-t border-border px-4 sm:px-0" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 mb-12 sm:mb-20">
          <div className="col-span-2 sm:col-span-1">
            <a className="text-lg sm:text-xl font-extrabold tracking-tighter mb-4 sm:mb-6 block" href="#home">
              <span className="text-foreground">Dev</span>
              <span className="text-primary">Log</span>
            </a>
            <p className="text-xs sm:text-sm text-muted-foreground">
              The high-definition workspace for developers.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base text-foreground">Product</h4>
            <ul className="flex flex-col gap-2 sm:gap-3">
              <li>
                <a className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors" href="#features">
                  Features
                </a>
              </li>
              <li>
                <a className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors" href="#pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors" href="#">
                  Integrations
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base text-foreground">Resources</h4>
            <ul className="flex flex-col gap-2 sm:gap-3">
              <li>
                <a className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors" href="#">
                  Documentation
                </a>
              </li>
              <li>
                <a className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors" href="#">
                  Blog
                </a>
              </li>
              <li>
                <a className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors" href="#">
                  Status
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base text-foreground">Legal</h4>
            <ul className="flex flex-col gap-2 sm:gap-3">
              <li>
                <a className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors" href="#">
                  Privacy
                </a>
              </li>
              <li>
                <a className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors" href="#">
                  Terms
                </a>
              </li>
              <li>
                <a className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors" href="#">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs text-muted-foreground order-2 md:order-1">
            © {new Date().getFullYear()} DevLog Systems Inc. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6 order-1 md:order-2">
            <a className="text-xs text-muted-foreground hover:text-foreground transition-colors" href="#">
              Twitter
            </a>
            <a className="text-xs text-muted-foreground hover:text-foreground transition-colors" href="#">
              GitHub
            </a>
            <a className="text-xs text-muted-foreground hover:text-foreground transition-colors" href="#">
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
