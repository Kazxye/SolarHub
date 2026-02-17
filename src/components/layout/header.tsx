"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginModal } from "@/components/auth/login-modal";
import { useAuth } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";

const DISCORD_URL = "https://discord.gg/solarhub";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#products", label: "Cheats" },
  { href: DISCORD_URL, label: "Suporte", external: true },
];

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

/* Mock user for login success */
const MOCK_USER = {
  id: "usr_001",
  name: "Jogador",
  email: "jogador@email.com",
  createdAt: "2024-08-15T00:00:00Z",
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const { isLoggedIn, login } = useAuth();

  const loginBtnRef = useRef<HTMLButtonElement>(null);
  const loginBtnMobileRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openLogin = useCallback(() => {
    setMobileMenuOpen(false);
    setLoginOpen(true);
  }, []);

  const handleLoginSuccess = useCallback(() => {
    login(MOCK_USER);
    setLoginOpen(false);
  }, [login]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div
          className={cn(
            "transition-all duration-300 border-b",
            scrolled
              ? "bg-background/80 backdrop-blur-xl border-border/50 shadow-sm shadow-black/5"
              : "bg-transparent border-transparent"
          )}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <Image
                  src="/icon.png"
                  alt="SolarHub"
                  width={30}
                  height={30}
                  className="w-[30px] h-[30px] group-hover:scale-105 transition-transform duration-200"
                />
                <span className="text-base font-bold text-text-primary tracking-tight">
                  Solar<span className="text-accent">Hub</span>
                </span>
              </Link>

              {/* Nav — center */}
              <nav className="hidden md:flex items-center gap-1">
                {navLinks.map((link) =>
                  link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>

              {/* Actions — right */}
              <div className="hidden md:flex items-center gap-2.5">
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  <DiscordIcon className="w-4 h-4" />
                  Discord
                </a>

                <div className="w-px h-5 bg-border/60" />

                {isLoggedIn ? (
                  <Link href="/perfil">
                    <Button variant="secondary" size="sm" className="gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      Conta
                    </Button>
                  </Link>
                ) : (
                  <Button
                    ref={loginBtnRef}
                    variant="primary"
                    size="sm"
                    onClick={openLogin}
                  >
                    Login
                  </Button>
                )}
              </div>

              {/* Mobile toggle */}
              <div className="flex md:hidden items-center gap-1">
                <button
                  className="p-2 -mr-2 text-text-secondary hover:text-text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Menu"
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={cn(
              "md:hidden overflow-hidden transition-all duration-300",
              mobileMenuOpen
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            )}
          >
            <div className="bg-background/95 backdrop-blur-xl border-t border-border/50">
              <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {navLinks.map((link) =>
                  link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface/60 rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface/60 rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                )}

                <div className="pt-3 mt-3 border-t border-border/50 space-y-2">
                  <a
                    href={DISCORD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface/60 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <DiscordIcon className="w-4 h-4" />
                    Discord
                  </a>

                  <div className="px-1">
                    {isLoggedIn ? (
                      <Link href="/perfil" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="secondary" size="md" className="w-full gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          Conta
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        ref={loginBtnMobileRef}
                        variant="primary"
                        size="md"
                        className="w-full"
                        onClick={openLogin}
                      >
                        Login
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={handleLoginSuccess}
        triggerRef={loginBtnRef}
      />
    </>
  );
}
