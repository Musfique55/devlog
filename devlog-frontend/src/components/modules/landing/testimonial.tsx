import { Card } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      'DevLog has completely changed our standup culture. We spend less time talking about what we did and more time solving problems.',
    author: 'Alex Rivera',
    role: 'Lead Dev at FinTech',
    company: 'FinTech Corp',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBz20kb8PPpsajs5uuho6A1jQcA4LwPYaZB73FhOZv1fvknlATSFz6alrZqr2v-Lt3D_Ef2tC5iKSCu5vksA8Ug9zVBOyQA8hnVgMukzXDOlQoA-I8xbTT5SQ2myPyVYPEeL0rPv4EdvZSFN8-MjTBXGWO-dEIg6xN1n-5kwfteL7384lkU3BfdrqCCNoWZYDzuwcIYKFCWpIiFkIQf4AJ3Ply_UAyKpeXAwfQRPddofF3YD9sknga-niBD8kuAa5a3bSikEXfcpQ',
    rating: 5,
    accent: 'from-violet-500/35 via-purple-500/15 to-fuchsia-500/10',
  },
  {
    quote:
      'The daily logging flow is perfect. I can capture updates without leaving my workflow, and the team stays aligned without extra meetings.',
    author: 'Sarah Chen',
    role: 'CTO at GrowthPulse',
    company: 'GrowthPulse',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg7GGGWmnLfnWsVa7wekCLPHTe-7iafwsWQDkzU2eLr1mkXr8sUe0Wq5y8XlNeVju3gadwTBlO8UMDt-JN5Atu-T1VUh9nmbNprzzTqVZKEr5QOF2DeF4KIWd_4vP2r9ZfVlhcP0ci8EfLC0PAJL2RJ7nCrhmmxyYVqmWvAuIvvJ9iIivBPoLkYlPR000TykIDfwDQltoGoFWUlYD-ETnui9Cou5c7waObYln_Uw2tDiZxENOnmQwGloXg7sFmuNtNOeGpCI-M',
    rating: 5,
    accent: 'from-sky-500/30 via-cyan-500/15 to-indigo-500/10',
  },
  {
    quote:
      'Managing a remote team is hard. DevLog gives me the visibility I need without micro-managing my engineers. Absolute game changer.',
    author: 'James Wilson',
    role: 'Engineering Manager',
    company: 'Tech Ventures',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0PWlXaPMcZh13EBWE1gjnr2aLQi89BMVi_vCbYcScpVM38xvgzZ7882bD0EEjZLdMohUYbRwXI4gvjSE2da1AB-2KiJpzgfS21HzJZ-VQHn9ONVKLsfTkbOAhf5HcafjaLE7hNS0PYmPGSFb3OIJVkjOy-UkVy7ubcQ9FcotZUW3eU7M5eIUPJVfY2KAV1uOP57wt48ejDq4S5FJPHwHTD7ttkoCRpFlvecMatT6TupmK2ZRQ5vksjR3VjaUPkqgcJSWES6J3lSM',
    rating: 5,
    accent: 'from-emerald-500/30 via-teal-500/15 to-cyan-500/10',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 overflow-hidden px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background via-primary/3 to-background relative">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-1/2 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center mb-14 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Loved by developers
          </h2>
          <p className="text-[1.05rem] sm:text-[1.2rem] text-[#B4B4C0] font-light leading-relaxed">
            See why teams choose DevLog to keep standups focused, visible, and effortless.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="p-8 flex flex-col gap-6 border border-primary/20 bg-linear-to-br from-primary/8 via-primary/4 to-transparent backdrop-blur-sm hover:border-primary/40 hover:bg-linear-to-br hover:from-primary/12 hover:via-primary/6 transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote with icon */}
              <div className="flex gap-4">
                <Quote className="w-5 h-5 text-primary/40 shrink-0 mt-1" />
                <p className="text-[1.1rem] sm:text-[1.2rem] text-[#F5F5F7] leading-relaxed font-medium">
                  {testimonial.quote}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-primary/20 mt-auto">
                {/* Avatar placeholder */}
                <div className={`w-12 h-12 rounded-full bg-linear-to-br ${testimonial.accent} border border-primary/20 flex items-center justify-center shrink-0`}>
                  <span className="text-sm font-bold text-white">{testimonial.author.charAt(0)}</span>
                </div>
                
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-xs text-[#B4B4C0]">{testimonial.company}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
