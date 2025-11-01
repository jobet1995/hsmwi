from django.db import models
from wagtail.fields import RichTextField, StreamField
from wagtail.admin.panels import FieldPanel
from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock
from wagtail.models import Page
from django.utils import timezone
from .blocks import *

class HomePage(Page):

    content = StreamField(
        [
            ("hero_banner", HeroBannerBlock()),
            ("mission_vision", MissionVisionBlock()),
            ("focus_areas", FocusAreasBlock()),
            ("featured_programs", FeaturedProgramsBlock()),
            ("latest_articles", LatestArticlesBlock()),
            ("partners_carousel", PartnersCarouselBlock()),
            ("testimonials", TestimonialBlock()),
            ("newsletter", NewsLetterBlock()),
            ("donation_cta", DonationCTABlock()),
            ("impact_stats", ImpactStatsBlock()),
            ("footer", FooterBlock()),
            ("calm_mode_toggle", CalmModeToggleBlock()),
        ],
        use_json_field=True,
        blank=True,
        verbose_name="Homepage Content Section",
        help_text="Add different sections to the homepage",
    )

    intro_text = RichTextField(
        blank=True,
        help_text="Optional introduction text for the homepage"
    )

    seo_keywords = models.CharField(
        max_length=255,
        blank=True,
        help_text="Comma-separated list of keywords for SEO"
    )

    header_background = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Background image for the header"
    )

    content_panels = Page.content_panels + [
        FieldPanel("intro_text"),
        FieldPanel("content"),
        FieldPanel("seo_keywords"),
        FieldPanel("header_background"),
    ]

    class Meta:
        verbose_name = "Home Page"


class ProgramPage(Page):
    description = RichTextField(blank=True)
    featured = models.BooleanField(default=False)
    featured_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )

    content_panels = Page.content_panels + [
        FieldPanel("description"),
        FieldPanel("featured"),
        FieldPanel("featured_image"),
    ]

    class Meta:
        verbose_name = "Program Page"


class ArticlePage(Page):
    category = models.ForeignKey(
        "ArticleCategoryPage",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="articles",
    )
    body = StreamField(
        [
            ("paragraph", blocks.RichTextBlock(features=["bold", "italic", "link"])),
            ("image", ImageChooserBlock()),
        ],
        use_json_field=True,
        blank=True,
    )

    published_date = models.DateField(default=timezone.now)

    content_panels = Page.content_panels + [
        FieldPanel("category"),
        FieldPanel("body"),
        FieldPanel("published_date")
    ]

    class Meta:
        verbose_name = "Article Page"

class ArticleCategoryPage(Page):
    description = RichTextField(blank=True)
    content_panels = Page.content_panels + [
        FieldPanel("description"),
    ]

    class Meta:
        verbose_name = "Article Category Page"
