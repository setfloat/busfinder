###User: People at/near my house

What: Info page for my house/immediate neighbors. Local Bus times for nearby stops as core feature. Possibly weather services as well.

Two Options:
  Option 1:
    Each direction of each stop will be on a materialize card
    Cards will include
        Upcoming bus times (possibly as background image)
        Where that bus heads towards
        User relevant Landmarks along that route.
  Option 2:
    10-20 closest buses
    Each direction of each bus on a materialize card
    Cards will include
        Route terminus
        Major stations/transit centers
        Upcoming bus times.
        Color pinned map tuned to cards, reflecting each stop.
    Option to port embed page into another site's page
  Option 3:
    Do it bigger and just for Galvanize

How: Pull API data for the prespecified stops to list when buses will arrive.

Features:

    Info about each route and maybe targets down that route.
    Pictures of Stops themselves.
    Simultaneous update on reload.
    Welcome Message
    Stops layed out by where they are at and what buses they serve
    Multiple stops loaded at once so no need for user to determine which of the group of relevant stops they would like to access. labeled so they know.

    auto refresh after 2 minutes.  Use JS.

    Add stop feature? #complicated, next level?
      Do the specific stops and if I get those working, add a feature for user to select and add stops (maybe from a list or from the open api/ a map).
