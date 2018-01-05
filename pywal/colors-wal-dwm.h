static const char norm_fg[] = "#89b4b1";
static const char norm_bg[] = "#031013";
static const char norm_border[] = "#5f7d7b";

static const char sel_fg[] = "#89b4b1";
static const char sel_bg[] = "#5E6553";
static const char sel_border[] = "#89b4b1";

static const char urg_fg[] = "#89b4b1";
static const char urg_bg[] = "#1C5952";
static const char urg_border[] = "#1C5952";

static const char *colors[][3]      = {
    /*               fg           bg         border                         */
    [SchemeNorm] = { norm_fg,     norm_bg,   norm_border }, // unfocused wins
    [SchemeSel]  = { sel_fg,      sel_bg,    sel_border },  // the focused win
    [SchemeUrg] =  { urg_fg,      urg_bg,    urg_border },
};
