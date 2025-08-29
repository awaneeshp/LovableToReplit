import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				/* Enterprise Border System */
				border: 'hsl(var(--border))',
				'border-strong': 'hsl(var(--border-strong))',
				input: 'hsl(var(--input))',
				'input-focus': 'hsl(var(--input-focus))',
				ring: 'hsl(var(--ring))',
				
				/* Enterprise Background System */
				background: 'hsl(var(--background))',
				'background-subtle': 'hsl(var(--background-subtle))',
				'background-muted': 'hsl(var(--background-muted))',
				foreground: 'hsl(var(--foreground))',
				
				/* Enterprise Primary Brand */
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					hover: 'hsl(var(--primary-hover))',
					subtle: 'hsl(var(--primary-subtle))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				
				/* Enterprise Secondary System */
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					hover: 'hsl(var(--secondary-hover))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				
				/* Status & Alert System */
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				info: {
					DEFAULT: 'hsl(var(--info))',
					foreground: 'hsl(var(--info-foreground))'
				},
				
				/* Muted & Neutral System */
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					hover: 'hsl(var(--muted-hover))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				
				/* Enterprise Accent System */
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					hover: 'hsl(var(--accent-hover))',
					subtle: 'hsl(var(--accent-subtle))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				
				/* Popover & Overlay System */
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				
				/* Card & Surface System */
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'enterprise-sm': 'var(--shadow-sm)',
				'enterprise-md': 'var(--shadow-md)',
				'enterprise-lg': 'var(--shadow-lg)',
				'enterprise': 'var(--shadow-enterprise)'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-success': 'var(--gradient-success)',
				'gradient-subtle': 'var(--gradient-subtle)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
