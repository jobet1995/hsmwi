from wagtail import blocks
from wagtail.blocks import (
    StructBlock, CharBlock, TextBlock, ListBlock,
    PageChooserBlock, URLBlock, IntegerBlock, BooleanBlock, ChoiceBlock
)
from wagtail.images.blocks import ImageChooserBlock


class HeroBannerBlock(StructBlock):
    title = blocks.CharBlock(required=True, max_length=140, help_text="Main headline")
    subtitle = blocks.TextBlock(required=False, help_text="Short subtitle or strapline")
    background_image = ImageChooserBlock(required=False, help_text="Background image (prefer landscape)")
    background_gradient = blocks.CharBlock(required=False, help_text="CSS gradient fallback (e.g. linear-gradient(...))")
    cta_primary_text = blocks.CharBlock(required=True, default="Get Help", max_length=64)
    cta_primary_link = URLBlock(required=True)
    cta_secondary_text = blocks.CharBlock(required=False, default="Join Us", max_length=64)
    cta_secondary_link = blocks.URLBlock(required=False)
    extra_classes = blocks.CharBlock(required=False, help_text="Optional classes to add to the root element")

    class Meta:
        template = "templates/home/hero_banner.html"
        icon = "image"
        label = "Hero Banner"
        help_text = "A large, attention-grabbing banner with a title, subtitle, and call-to-action buttons"

class MissionVisionBlock(StructBlock):
    mission_text = blocks.RichTextBlock(required=True, features=["bold", "link"], help_text="Brief mission statement")
    vision_text = blocks.RichTextBlock(required=True, features=["bold", "link"], help_text="Brief vision statement")
    values_list = blocks.ListBlock(blocks.CharBlock(max_length=140), required=False, help_text="List core values (each item)")
    mission_icon = ImageChooserBlock(required=False)
    vision_icon = ImageChooserBlock(required=False)
    values_icon = ImageChooserBlock(required=False)
    background_color = blocks.CharBlock(required=False, help_text="Optional pastel background CSS color or class")

    class Meta:
        template = "templates/home/mission_vision.html"
        icon = "placeholder"
        label = "Mission and Vision"
        help_text = "A section to state the organisation's mission, vision, and core values"

class FocusAreasBlock(StructBlock):
    grid_title = blocks.CharBlock(required=False, max_length=140)
    areas = ListBlock(
        StructBlock([
            ("title", CharBlock(required=True, max_length=80)),
            ("description", TextBlock(required=True, help_text="Short description")),
            ("icon_svg", TextBlock(required=False, help_text="Optional inline SVG markup or icon name")),
            ("cta_url", URLBlock(required=False)),
        ]),
        min_length=3,
        max_length=6,
        help_text="Add 3 or more focus area cards (Awareness, Support, Collaboration, ...)"
    )

    class Meta:
        template = "templates/home/focus_areas.html"
        icon = "grid"
        label = "Focus Areas"
        help_text = "A grid of focus area cards with title, description, and optional call-to-action link"

class FeaturedProgramsBlock(StructBlock):
    heading = CharBlock(required=False)
    programs = ListBlock(PageChooserBlock(required=False, page_type=["home.ProgramPage"]), required=False, help_text="Manual selection (optional)")
    auto_query = BooleanBlock(required=False, default=True, help_text="If true, auto-select featured ProgramPage entries")
    limit = IntegerBlock(default=6, required=False, help_text="Maximum programs to show")

    class Meta:
        template = "templates/home/featured_programs.html"
        icon = "fa-columns"
        label = "Featured Programs"
        help_text = "A grid of featured programs with optional manual selection or auto-query based on featured status"


class LatestArticlesBlock(StructBlock):
    heading = CharBlock(required=False, default="Latest Articles")
    count = IntegerBlock(required=False, default=3, help_text="Number of articles to show initially")
    category_filter = PageChooserBlock(required=False, page_type=["home.ArticleCategoryPage"], help_text="Optional category filter")

    class Meta:
        template = "templates/home/latest_articles.html"
        icon = "fa-newspaper"
        label = "Latest Articles"
        help_text = "A list of latest articles with optional heading and category filter"


class PartnersCarouselBlock(StructBlock):
    partners = ListBlock(
        StructBlock([
            ("partner_logo", ImageChooserBlock(required=True)),
            ("partner_name", CharBlock(required=True, max_length=140)),
            ("website_url", URLBlock(required=False)),
        ]),
        help_text="List of partner logos, names, and optional website links"
    )

    class Meta:
        template = "templates/home/partners_carousel.html"
        icon = "fa-handshake"
        label = "Partners Carousel"
        help_text = "A carousel of partner logos and names with optional website links"

class TestimonialBlock(StructBlock):
    testimonials = ListBlock(
        StructBlock([
            ("name", CharBlock(required=True, max_length=120)),
            ("quote", TextBlock(required=True)),
            ("photo", ImageChooserBlock(required=False)),
            ("video_link", URLBlock(required=False)),
        ])
    )
    autoplay = BooleanBlock(required=False, default=False)
    autoplay_interval = IntegerBlock(required=False, default=7000, help_text="Milliseconds between auto slides")
    show_dots = BooleanBlock(required=False, default=True)

    class Meta:
        template = "templates/home/testimonials.html"
        icon = "fa-comments"
        label = "Testimonials"
        help_text = "A carousel of testimonials with name, quote, photo, and optional video link"

class NewsLetterBlock(StructBlock):
    title = CharBlock(required=False, default="Join our newsletter")
    text = TextBlock(required=False, help_text="Short description text")
    placeholder = CharBlock(required=False, default="Enter your email")
    button_text = CharBlock(required=False, default="Subscribe")
    endpoint = CharBlock(required=False, default="/newsletter/subscribe/", help_text="AJAX endpoint for subscription")

    class Meta:
        template = "templates/home/newsletter.html"
        icon = "fa-envelope"
        label = "Newsletter Signup"
        help_text = "A newsletter signup form with title, text, placeholder, button text, and endpoint"

class DonationCTABlock(StructBlock):
    headline = CharBlock(required=True, max_length=180)
    description = TextBlock(required=False)
    button_text = CharBlock(required=False, default="Donate Now")
    donation_url = URLBlock(required=True)
    include_illustration = BooleanBlock(required=False, default=False)
    illustration_image = ImageChooserBlock(required=False)

    class Meta:
        template = "templates/home/donation_cta.html"
        icon = "fa-dollar-sign"
        label = "Donation CTA"
        help_text = "A call-to-action for donations with headline, description, button text, and donation URL"


class ImpactStatsBlock(StructBlock):
    stats = ListBlock(
        StructBlock([
            ("icon", ImageChooserBlock(required=False)),
            ("label", CharBlock(required=True, max_length=80)),
            ("value", IntegerBlock(required=True)),
        ]),
        help_text="Add 3-4 statistic items with label and numeric value"
    )
    duration_ms = IntegerBlock(required=False, default=2000, help_text="Duration of count-up animation in milliseconds")

    class Meta:
        template = "templates/home/impact_stats.html"
        icon = "fa-chart-bar"
        label = "Impact Stats"
        help_text = "A section to display impact statistics with icons, labels, and numeric values"

class FooterBlock(StructBlock):
    mission_quote = TextBlock(required=False)
    links = ListBlock(
        StructBlock([
            ("label", CharBlock(required=True, max_length=80)),
            ("url", URLBlock(required=True)),
        ]),
        required=False
    )
    newsletter_enabled = BooleanBlock(required=False, default=True)
    social_links = ListBlock(
        StructBlock([
            ("network", ChoiceBlock(choices=[
                ("facebook", "Facebook"),
                ("twitter", "Twitter"),
                ("instagram", "Instagram"),
                ("youtube", "YouTube"),
                ("linkedin", "LinkedIn"),
            ])),
            ("url", URLBlock(required=True)),
        ]),
        required=False
    )

    class Meta:
        template = "templates/home/footer.html"
        icon = "fa-compass"
        label = "Footer"
        help_text = "The footer section with mission quote, links, newsletter signup, and social media links"

class CalmModeToggleBlock(StructBlock):
    label = CharBlock(required=False, default="Calm Mode")
    description = TextBlock(required=False, help_text="Optional description for the toggle")

    class Meta:
        template = "templates/home/calm_mode_toggle.html"
        icon = "fa-moon"
        label = "Calm Mode Toggle"
        help_text = "A toggle for calming mode with optional label and description"

BLOCK_REGISTRY ={
    "hero_banner": HeroBannerBlock(),
    "mission_vision": MissionVisionBlock(),
    "focus_areas": FocusAreasBlock(),
    "featured_programs": FeaturedProgramsBlock(),
    "latest_articles": LatestArticlesBlock(),
    "partners_carousel": PartnersCarouselBlock(),
    "testimonials": TestimonialBlock(),
    "newsletter": NewsLetterBlock(),
    "donation_cta": DonationCTABlock(),
    "impact_stats": ImpactStatsBlock(),
    "footer": FooterBlock(),
    "calm_mode_toggle": CalmModeToggleBlock(),
}