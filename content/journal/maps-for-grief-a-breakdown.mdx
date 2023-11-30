---
title: 'Maps for grief: a breakdown'
date: 2022-03-01T05:00:00.000Z
description: 'Breaking down the behaviours, features and rarities in the series'
inFrench: false
---

A bit of context: **Maps for grief** is a generative art project, published on the [Art blocks](https://www.artblocks.io) platform. It explores the notion of togetherness without contact. If
you're interested, I published an introductory post about the series
before its launch: [Maps for grief](https://louis-andre.net/journal/maps-for-grief).

By
reading this post, non-technical people should understand the
mechanisms that draw a Maps for grief iteration, and someone technical
should have enough of an explanation to code their own take on the same
idea.

## How each iteration is drawn

The basic structure of
Maps for grief is the interaction of two noise fields. A noise field is a
map of random values across coordinates, with rules governing how its
values change across its area. In our case, each field is
two-dimensional, and filled with Simplex noise. This means that two
points close to each other will have very similar noise values, while
points further apart could be more different. You can picture a map of
rolling hills, with the lowest points having a value of `0`, and the highest ones, `1`.

![Visualization of the two fields in Maps for grief](/journal/maps-for-grief-breakdown/Fields.jpg)

Each
of the two fields has a specific role: The first one is turned into a
flow field – each value represents a certain angle. You've certainly
come across art based on flow fields in the past – like Tyler Hobbs' [Fidenza](https://tylerxhobbs.com/fidenza). In our case, the flow field is used to orient how each line moves in the space once it starts being drawn.

In
the rules I set for drawing lines in Maps for grief, each line has a
finite length that it attempts to draw without touching another shape.
Each composition tries to insert a total of ten thousand such lines at
random positions within its margins. The first ones always have the
space to be drawn, while the very last are usually all skipped, since
the space is already filled by previously drawn lines.

If we
simply drew based on the first flow field, then the artwork could look
pretty, but it wouldn't have much substance. Here's how the line work
would turn out (I left most other rules in, which is why the first one
is split in two regions):

![Demonstration: Lines only](</journal/maps-for-grief-breakdown/Lines only.png>)![Demonstration: Lines only](</journal/maps-for-grief-breakdown/Lines only 2.png>)

The
second noise field, as it grows in value, forces these lines to stop
drawing sooner, and at extreme values, prevents them from drawing
entirely. It's also responsible for turning "stopped" areas into symbols
instead, and it affects the colour selection across the composition. By
adding the second field's influence on drawn lines, we end up with
results like these:

![Demonstration: Lines and dots](</journal/maps-for-grief-breakdown/Secondary field.png>)![Demonstration: Lines and dots](</journal/maps-for-grief-breakdown/Secondary field 2.png>)

The last part is inserting symbols. The most on-the-nose part of *Maps for grief* is the drawing of these symbols, which appear in areas where lines
can't flow. These are the regions where the secondary field is the
strongest. Each iteration has a single type of *coping*, deciding
what type of symbol is drawn. There can be different drawing rules for
different symbols, which helps give each of the coping types a specific
personality.

Putting everything together, here's the sort of outputs we get:

![Maps for grief #231](/journal/maps-for-grief-breakdown/235000231.png)![Maps for grief #384](/journal/maps-for-grief-breakdown/235000384.png)

There are a ton of small pieces and details, but that's the gist of it. Let's analyze the main features involved.

## Main feature & rarity breakdown

### Coping

![](/journal/maps-for-grief-breakdown/Coping.jpg)

Coping is one of four values: **raw** (drops, or tears), **nature** (mountains), **mystical** (asterisks), and **spiritual** (crosses). Crosses and mountains can huddle very close together and
create areas that change in density, tears follow the flow of the field,
and stars vary how much branches they have in reaction to the secondary
field's value.

#### Rarities (coded / actual):

* Mystical 24.8% / **25.2%**
* Nature 24.8% / **22%**
* Raw 24.8% / **24.2%**
* Spiritual 24.8% / **26,4%**

### Palette

![](/journal/maps-for-grief-breakdown/Palettes.jpg)

There
are six palettes. Four of them are dark: **Nebula**, **Terminal**, **Winter
forest**, and **Witching Hour**. Two other are light: **IKEA Showroom** and
**Parched**. Note that any palette has a chance of being subsampled (this
is an unlisted feature). A piece with multiple regions can pick between
its full palette or any of its subsamplings when it starts drawing each
separate region.

#### Rarities (coded / actual):

* Terminal 16.6% / **15.4%**
* Nebula 16.6% / **15.6%**
* Winter forest 16.6% / **17%**
* Witching hour 16.6% / **18%**
* IKEA Showroom 16.6% / **16.8%**
* Parched 16.6% / **17.2%**

### Stroke length

![](/journal/maps-for-grief-breakdown/Lengths.jpg)

Lines
don't all have the same maximum length, and for each piece, this length
is set within a certain range. The range is picked at random on a
sliding scale, but for simplicity's sake, all pieces are classified
among three length groups. Short lines are capped under 1/12th the width
of the piece, long ones can go over 1/10th of the piece, average lines
are between the two.

#### Rarities (coded / actual):

* Short 32 % / **31.2%**
* Average 27.8% / **25.6%**
* Long 40% / **43.2%**

### Tip size

![](</journal/maps-for-grief-breakdown/Tip size.jpg>)

There
are four predetermined tip sizes. I see them as guidelines to the scale
of an iteration: Fine tip pieces are the best ones to present at a
large scale, while fat marker ones (my favorite size, personally) look
great even as thumbnails, but can lack in detail if they're too big.

#### Rarities (coded / actual):

* Fine 25 % / **25.8%**
* Average 37.5% / **38%**
* Thick 25% / **25.4%**
* Fat marker 12.5% / **10.8%**

### Region count

![](/journal/maps-for-grief-breakdown/Regions.jpg)

There
are four possible panel arrangement, with single-panel being the most
probable. An interesting interaction is that larger tip sizes can almost
entirely hide their center seams (which might still be revealed by a
change of subpalette), while smaller line width yields clean divisions
between each region.

#### Rarities (coded / actual):

* Single region 50 % / **52.8%**
* Two 25% / **24%**
* Three 20% / **18%**
* Four 5% / **5.2%**

## Special features

There are a few features that recognizably alter how a piece is drawn. These are features that are simply "on" or not.

### No dots

Usually, in a *Maps for grief* composition, some line insertions that should be symbols will draw a simple dot instead. Pieces with this attribute forego the dots, leading to sparser symbol areas.

Rarity: 2.5% / **2.8%**

![Maps for grief #39](/journal/maps-for-grief-breakdown/235000039.png)

### Persistent lines

I
said previously that each line's maximum length is picked on a sliding
scale. This scale is supposed to be affected by the strength of the
secondary field. Pieces with the **Persistent line** attribute have lines that are unaffected and attempt to run their full length no matter where they end.

Rarity: 5% / **4.6%**

\*\*\*\*![Maps for grief #499](/journal/maps-for-grief-breakdown/235000499.png)

### Radial

This is an attribute that adds an additional influence to the primary flow field. **Radial** outputs
have their lines aligned in relation to a center that pushes them in or
out. Combined with the usual forces of the field, it often yields a
spiral composition, though that's not the only possible output.

Rarity: 5% / **4.6%**

\*\*\*\*![Maps for grief #69](/journal/maps-for-grief-breakdown/235000069.png)

### Confused (special coping type)

Very
rarely, an iteration will not actually have a set coping type. The
distribution of coping types should be a flat 25% for each, but it's
lower than this because in a very small amount of iterations, the **confused** attribute
means the piece will pick a random symbol any time it has to draw one.
There are only ten pieces with this attribute in the whole collection,
which is still double the coded chance of them occuring.

Rarity: 0.8% / **2%**

\*\*\*\*![Maps for grief #485](/journal/maps-for-grief-breakdown/235000485.png)

## Invisible and minor features

There are other dimensions that are decided for each iteration, with varying levels of influence on its structure and aesthetic.

**Palette variants** exist
for each of the six palettes. The way it works is that each named
palette actually has two possible accent colours, and two possible
backgrounds, however each iteration picks only one of the accent and
background colours, along with a certain amount of intermediary colours.

**Drawing jitter** determines how "shaky" the line drawing is. This is set in relation to
tip size as well, so the outputs with the most jitter are ones with *Fat marker* tip size. You can get a feel for it by pressing a on the keyboard to animate an iteration in its live view.

**Line spacing** can vary a bit, and decides how much distance lines must have between each other.

**Radial field strength** affects compositions with the *Radial* feature. When very strong, it forces lines to point almost directly to
the center, while a low value will draw a soft spiraling composition.

**Force field scale** decides how much variance can be packed within the surface of an
iteration. Pieces with a small scale (think of it as being zoomed out)
tend to exhibit small "continents" of symbol areas separated by lines.
Larger-scale ones will rather show a single movement across their area.

**Flow field base angle** and angle range determine the main "axis" of the flow field, and how much lines can
veer away from it. Composition with very low angle range are almost
linear, while compositions with high angle range and sufficient force
field scale are the most turbulent.

## Variable values

Some variables are not exactly set by the seed, as they are adjusted by the generation process later on.

![](</journal/maps-for-grief-breakdown/Palette variants.jpg>)

**Anomaly threshold** (or *symbol threshold*)
is the value past which the secondary field forces lines to turn to
symbols. Because the output of the field always varies, the generation
process "scans" the field before committing to it. If it finds too
little variance, it will lower the anomaly threshold, so that a lesser
field strength can allow symbols to appear.

**Field offset**
also affects the secondary field. When the generation step finds too
little variance in the field, it also moves it around a bit – think of
it as moving a picture frame above a larger canvas, to see a different
part of it. This is done in conjunction with a light change in the
anomaly threshold.

**Palette/restricted palette** is a changing
list of available colors that the drawing script picks from. In
single-region outputs, it does not change, but in multiple regions, it
has a chance to change and pick a new subpalette (or go back to the full
palette) before each.

## Dive in!

If you want to try your
hand at picking out the expressed features of a given iteration, feel
free to browse the collection. It's possible to do so [on Artblocks](https://www.artblocks.io/project/235) where it was minted, on places like [Artacle](https://artacle.io/project/maps-for-grief), which will let you filter a collection like this using its different features, and on [Opensea](https://opensea.io/collection/maps-for-grief-by-louis-andre-labadie), which is more of a marketplace.

***

Oh,
still here? Okay – if you're interested, I've done three of my own
analyses to get you started. Enjoy, and thanks for reading!

![Maps for grief #443](/journal/maps-for-grief-breakdown/235000443.png)

That's iteration #443. Thick line width, long strokes, single region. Its crosses means it has **spiritual** coping. It has the intense magenta of the **Nebula** palette. And since it's only showing magenta, we can tell it's **subsampled**. Its long lines also extend into symbol zones, meaning it has the rare **persistent lines** feature.
We can also tell that the angle range is rather narrow, because the
darkest and the lightest parts of the composition are oriented within a
quarter-turn of each other.

![Maps for grief #430](/journal/maps-for-grief-breakdown/235000430.png)

Here's
iteration #430. It's a three-panel composition, and again uses the
**Nebula** palette. The first two panels seem to use the full range of the
palette with a magenta accent, while the third panel has a **subsampled**
palette based on the turquoise accent. With lines this narrow, the tip
size is probably **Fine**. This time, the noise scale seems rather
large, because there's a lot of variation across the whole piece.
Similarly, its angle range is quite high – the flow field is able to
turn back on itself, and it's hard to tell what the base angle might be.
In comparison, it was very easy to guess the average angle in #443. As a
consequence of its narrow line width, it will also have rather precise
drawing jitter, meaning its animation will be softer, up to pretty large
display sizes.

![Maps for grief #23](/journal/maps-for-grief-breakdown/235000023.png)

And here's #23! Again, a **three-region** composition, this time with **mystical** coping, as indicated by the stars. If I want to follow how strong the
secondary field is, I can look at how large the stars are, and how many
branches they have. The third panel also seems to have picked different
transition colours from the **IKEA showroom** palette the piece has. The
top-right corner lets us see that it's showing a light blue where the
rest of the composition would use the light purple/gray (lower left). It
also has the rare **radial** attribute, and its radial field
strength is very strong – we can hardly tell the influence of the
primary flow field over the drawn lines. It also has an off-center
radial pull, which only happens to half of radial compositions (that's
another untracked rare feature for you!).
