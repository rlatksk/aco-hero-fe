"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, Linkedin, Mail } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="min-h-screen p-4">
      <div className="container mx-auto max-w-4xl py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            About This Project
          </h1>
          <p className="text-[#8b949e]">
            Understanding the technology behind the Dota 2 hero optimizer
          </p>
        </header>

        <div className="space-y-6">
          {/* 0/1 Knapsack Problem */}
          <Card className="card-bg border-[#21262d]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#58a6ff]">
                What is the 0/1 Knapsack Problem?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-[#c9d1d9]">
              <p>
                The <strong>0/1 Knapsack Problem</strong> is a classic optimization problem in operation research. 
                Imagine you have a knapsack (backpack) with a limited weight capacity, and you have a set of items, 
                each with its own weight and value. The goal is to select items to put in the knapsack to maximize 
                the total value while staying within the weight limit.
              </p>
              <p>
                The &quot;0/1&quot; part means that for each item, you can either take it (1) or leave it (0) — you cannot 
                take a fraction of an item. This makes it a discrete optimization problem.
              </p>
              <div className="bg-[#161b22] p-4 rounded-md border border-[#21262d]">
                <h4 className="font-semibold mb-2 text-[#58a6ff]">Application to Dota 2:</h4>
                <p className="text-sm">
                  In this project, heroes are the &quot;items,&quot; and the team composition is the &quot;knapsack.&quot; 
                  Each hero has attributes (like win rate, synergy with teammates, counter effectiveness against enemies) 
                  that contribute to the team&apos;s overall &quot;value.&quot; The constraint is the team size (5 heroes) and role requirements. 
                  The optimizer finds the best combination of heroes to maximize your team&apos;s effectiveness.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Ant Colony Optimization */}
          <Card className="card-bg border-[#21262d]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#58a6ff]">
                What is Ant Colony Optimization (ACO)?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-[#c9d1d9]">
              <p>
                <strong>Ant Colony Optimization (ACO)</strong> is a metaheuristic algorithm inspired by the behavior of 
                real ants searching for food. When ants explore their environment, they leave pheromone trails. 
                Other ants are more likely to follow paths with stronger pheromone concentrations. Over time, 
                shorter and more efficient paths accumulate more pheromones, guiding the colony to optimal solutions.
              </p>
              
              <div className="bg-[#161b22] p-4 rounded-md border border-[#21262d]">
                <h4 className="font-semibold mb-2 text-[#58a6ff]">How ACO Works:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li><strong>Initialization:</strong> Artificial ants are placed at random starting points.</li>
                  <li><strong>Solution Construction:</strong> Each ant builds a solution by probabilistically selecting the next component based on pheromone levels and heuristic information.</li>
                  <li><strong>Pheromone Update:</strong> After all ants complete their solutions, pheromone trails are updated. Good solutions receive more pheromone, while all trails undergo some evaporation.</li>
                  <li><strong>Iteration:</strong> The process repeats for many iterations, allowing the algorithm to converge toward optimal or near-optimal solutions.</li>
                </ol>
              </div>

              <div className="bg-[#161b22] p-4 rounded-md border border-[#21262d]">
                <h4 className="font-semibold mb-2 text-[#58a6ff]">Why ACO for Hero Selection?</h4>
                <p className="text-sm">
                  ACO is particularly well-suited for combinatorial optimization problems like hero selection because:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                  <li>It can handle complex constraint satisfaction (roles, synergies, counters)</li>
                  <li>It naturally explores multiple solution paths simultaneously</li>
                  <li>It balances exploration (trying new hero combinations) with exploitation (refining good solutions)</li>
                  <li>It can adapt to different game scenarios by adjusting pheromone weights</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* About Me */}
          <Card className="card-bg border-[#21262d]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#58a6ff]">
                About the Developer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-[#c9d1d9]">
              <p>
                Hi! I&apos;m <strong className="text-[#58a6ff]">rlatksk</strong>, a developer passionate about combining 
                artificial intelligence, optimization algorithms, and gaming. This project was developed as part of 
                my final assessment to demonstrate the practical application of metaheuristic algorithms in solving 
                real-world problems.
              </p>
              <p>
                As a Dota 2 player, I&apos;ve always been fascinated by the strategic depth of hero selection and team composition. 
                This project bridges my interests in gaming and computer science, using advanced algorithms to help players 
                make better draft decisions.
              </p>
              
              <div className="flex flex-wrap gap-3 mt-6">
                <Button variant="outline" size="sm" asChild className="border-[#21262d] hover:bg-[#21262d]">
                  <a href="https://github.com/rlatksk" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </Button>

              </div>
            </CardContent>
          </Card>

          {/* Feedback Section */}
          <Card className="card-bg border-[#21262d] bg-gradient-to-br from-[#1f6feb]/5 to-transparent">
            <CardHeader>
              <CardTitle className="text-2xl text-[#58a6ff]">
                Help Improve This Project
              </CardTitle>
              <CardDescription className="text-[#8b949e]">
                Your feedback is valuable for my final assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#c9d1d9]">
              <p>
                If you&apos;ve used this optimizer, I would greatly appreciate your feedback! Your input will help me 
                improve the project and provide valuable insights for my academic assessment.
              </p>
              <p className="text-sm">
                The survey takes about 3-5 minutes:
              </p>
              
              <div className="pt-4">
                <Button 
                  asChild 
                  className="w-full sm:w-auto bg-[#216FE6] hover:bg-[#66A8F9] text-[#F5FBEF]"
                  size="lg"
                >
                  <a 
                    href="https://forms.gle/YOUR_GOOGLE_FORM_ID" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Fill Out Feedback Survey
                  </a>
                </Button>
              </div>
              
              <p className="text-xs text-[#8b949e] italic">
                Thank you for taking the time to help me with my final assessment!
              </p>
            </CardContent>
          </Card>
        </div>

        <footer className="mt-12 pt-6 border-t border-[#21262d] text-center">
          <p className="text-xs text-[#8b949e]">
            This project was developed as a final assessment demonstrating the application of 
            Ant Colony Optimization to solve the 0/1 Knapsack Problem in the context of Dota 2 hero selection.
          </p>
        </footer>
      </div>
    </main>
  )
}
