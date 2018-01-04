static const char norm_fg[] = "#98a3a1";
static const char norm_bg[] = "#1e0b0f";
static const char norm_border[] = "#6a7270";

static const char sel_fg[] = "#98a3a1";
static const char sel_bg[] = "#5E5656";
static const char sel_border[] = "#98a3a1";

static const char urg_fg[] = "#98a3a1";
static const char urg_bg[] = "#344854";
static const char urg_border[] = "#344854";

static const char *colors[][3]      = {
    /*               fg           bg         border                         */
    [SchemeNorm] = { norm_fg,     norm_bg,   norm_border }, // unfocused wins
    [SchemeSel]  = { sel_fg,      sel_bg,    sel_border },  // the focused win
    [SchemeUrg] =  { urg_fg,      urg_bg,    urg_border },
};
