export default function AboutSection({ variant = "compact" }) {
  if (variant === "full") {
    return (
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-semibold">About Play Safe</h2>
        <p className="text-muted-foreground">
          SafePlay stands out by bridging space-based data with practical, event-oriented applications.
          Unlike traditional weather apps, it combines predictive alerts, hazard awareness, and live satellite imagery
          for specific venues and timeframes, enhancing reliability and trust.
        </p>
        <div className="space-y-2 text-muted-foreground">
          <div className="font-medium text-foreground">For end-users, SafePlay:</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>Improves safety by enabling timely preventive actions.</li>
            <li>Reduces economic losses by supporting better contingency planning.</li>
            <li>Offers peace of mind through accurate, science-backed insights.</li>
          </ul>
          <p>
            Its integration of NASA’s open data provides transparency and global scalability, making it adaptable for
            diverse events and regions worldwide.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Executive Summary</h3>
          <p className="text-muted-foreground">
            Extreme weather events and natural hazards have increased in both frequency and intensity due to climate change.
            Such events can disrupt large public gatherings, especially outdoor sporting events, creating risks to participants,
            fans, and local communities. The challenge we selected focuses on leveraging NASA’s open Earth‑observation data to
            improve resilience and preparedness against these risks.
          </p>
          <p className="text-muted-foreground">
            Current weather applications often provide general forecasts but lack the context‑aware insights and live satellite
            information that event organizers and attendees need. For example, during international tournaments, unexpected storms
            or floods can cause match delays, unsafe travel conditions, and significant economic losses.
          </p>
          <p className="text-muted-foreground">
            Our proposed solution, SafePlay, is a web‑based platform that combines NASA’s POWER API, EONET natural event tracker,
            and GIBS satellite imagery to deliver venue‑specific forecasts, hazard alerts, and actionable safety tips. It also links
            to sports event schedules to provide automated weather and hazard assessments for each match.
          </p>
          <p className="text-muted-foreground">
            We chose this challenge because it reflects a tangible opportunity to use space‑based science to directly improve public
            safety and event planning on Earth. By integrating real‑time and historical climate data with predictive analytics and
            satellite visuals, SafePlay empowers communities to act early and confidently, fulfilling the hackathon’s objective of
            turning space data into impactful Earth solutions.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Problem Definition</h3>
          <p className="text-muted-foreground">
            Extreme weather events and natural hazards — such as storms, heatwaves, floods, and wildfires — increasingly disrupt
            public gatherings and sports events worldwide, often with little warning. These disruptions not only endanger participants
            and spectators but also create significant logistical challenges and economic losses.
          </p>
          <p className="text-muted-foreground">
            For example, in recent years, international tournaments — including matches during major championships — have faced delays
            or cancellations due to severe weather conditions. Traditional weather forecasts often fail to provide hyper‑local, event‑focused
            insights or integrate satellite‑based observations that can enhance early situational awareness.
          </p>
          <p className="text-muted-foreground">
            Currently, there is no centralized, accessible platform that combines space‑based observation data with real‑time event
            management needs to offer early warnings and guidance for specific venues. This gap limits preparedness and response efforts.
            Our project aims to bridge this gap by leveraging NASA’s open data to deliver timely, actionable alerts that enhance public
            safety and event continuity.
          </p>
        </div>
      </section>
    );
  }

  // Compact variant
  return (
    <section className="space-y-4">
      <h2 className="text-xl md:text-2xl font-semibold">About Play Safe</h2>
      <div className="space-y-3 text-muted-foreground">
        <p>
          SafePlay bridges space‑based data with practical, event‑oriented applications, combining predictive alerts,
          hazard awareness, and live satellite imagery for specific venues and timeframes.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Improves safety with timely preventive actions.</li>
          <li>Reduces economic losses via better contingency planning.</li>
          <li>Delivers peace of mind through science‑backed insights.</li>
        </ul>
      </div>
    </section>
  );
}


