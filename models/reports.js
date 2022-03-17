const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Dati Generali
const generalSchema = new Schema({
    author:     { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    match_num:  { type: String, default: '' },
    series:     { type: String, default: 'CM' },
    date:       { type: String, default: '' },
    time:       { type: String, default: '' },
    real_time:  { type: String, default: '' },
    teams:      { type: String, default: '' },
    first_ref:  { type: mongoose.Types.ObjectId, required: true, ref: 'Referee' }, // ObjectId
    second_ref: { type: mongoose.Types.ObjectId, ref: 'Referee' }, // ObjectId
    scorer:     { type: String, default: '' },
});

// Dati Gara
const matchSchema = new Schema({
    result:     { type: String, default: '' },
    duration:   { type: Number, default: 0 },
    spects:     { type: Number, default: 0 },
    pts1set:    { type: String, default: '' },
    pts2set:    { type: String, default: '' },
    pts3set:    { type: String, default: '' },
    pts4set:    { type: String, default: '' },
    pts5set:    { type: String, default: '' },
    pts6set:    { type: String, default: '' },
    dur1set:    { type: Number, default: 0 },
    dur2set:    { type: Number, default: 0 },
    dur3set:    { type: Number, default: 0 },
    dur4set:    { type: Number, default: 0 },
    dur5set:    { type: Number, default: 0 },
    dur6set:    { type: Number, default: 0 },
});

// Area Immagine
const imageSchema = new Schema({
    aspect1ref:     { type: Number, default: 2 },
    aspect2ref:     { type: Number, default: 2 },
    delay1ref:      { type: Number, default: 2 },
    delay2ref:      { type: Number, default: 2 },
    prot1ref:       { type: Number, default: 2 },
    prot2ref:       { type: Number, default: 2 },
    whistle1ref:    { type: Number, default: 2 },
    whistle2ref:    { type: Number, default: 2 },
    complaint1ref:  { type: Number, default: 2 },
    complaint2ref:  { type: Number, default: 2 },
    image_notes:    { type: String, default: '' },
});

const technicalSchema = new Schema({
    complexity:             { type: Number, default: 3 },
    tech1ref:               { type: Number, default: 2 },
    tech2ref:               { type: Number, default: 2 },
    ballsinout_ord_1ref:    { type: Number, default: 0 },
    ballsinout_ord_2ref:    { type: Number, default: 0 },
    ballsinout_sev_1ref:    { type: Number, default: 0 },
    ballsinout_sev_2ref:    { type: Number, default: 0 },
    balltouches_ord_1ref:   { type: Number, default: 0 },
    balltouches_sev_1ref:   { type: Number, default: 0 },
    firsttouch_ord_1ref:    { type: Number, default: 0 },
    firsttouch_sev_1ref:    { type: Number, default: 0 },
    penetration_ord_1ref:   { type: Number, default: 0 },
    penetration_ord_2ref:   { type: Number, default: 0 },
    penetration_sev_1ref:   { type: Number, default: 0 },
    penetration_sev_2ref:   { type: Number, default: 0 },
    posfaults_ord_1ref:     { type: Number, default: 0 },
    posfaults_ord_2ref:     { type: Number, default: 0 },
    posfaults_sev_1ref:     { type: Number, default: 0 },
    posfaults_sev_2ref:     { type: Number, default: 0 },
    nettouches_ord_1ref:    { type: Number, default: 0 },
    nettouches_ord_2ref:    { type: Number, default: 0 },
    nettouches_sev_1ref:    { type: Number, default: 0 },
    nettouches_sev_2ref:    { type: Number, default: 0 },
    walltouches_ord_1ref:   { type: Number, default: 0 },
    walltouches_ord_2ref:   { type: Number, default: 0 },
    walltouches_sev_1ref:   { type: Number, default: 0 },
    walltouches_sev_2ref:   { type: Number, default: 0 },
    airplay_ord_1ref:       { type: Number, default: 0 },
    airplay_sev_1ref:       { type: Number, default: 0 },
    defensefaults_ord_1ref: { type: Number, default: 0 },
    defensefaults_ord_2ref: { type: Number, default: 0 },
    defensefaults_sev_1ref: { type: Number, default: 0 },
    defensefaults_sev_2ref: { type: Number, default: 0 },
    servefaults_ord_1ref:   { type: Number, default: 0 },
    servefaults_sev_1ref:   { type: Number, default: 0 },
    liberofaults_ord_1ref:  { type: Number, default: 0 },
    liberofaults_ord_2ref:  { type: Number, default: 0 },
    liberofaults_sev_1ref:  { type: Number, default: 0 },
    liberofaults_sev_2ref:  { type: Number, default: 0 },
    otherfaults_ord_1ref:   { type: Number, default: 0 },
    otherfaults_ord_2ref:   { type: Number, default: 0 },
    otherfaults_sev_1ref:   { type: Number, default: 0 },
    otherfaults_sev_2ref:   { type: Number, default: 0 },
    error_notes:            { type: String, default: '' },
    collab1ref:             { type: Number, default: 2 },
    collab2ref:             { type: Number, default: 2 },
    collab_notes:           { type: String, default: '' },
});

// Area Relazionale
const relationalSchema = new Schema({
    gest_difficulty:    { type: Number, default: 3 },
    gest1ref:           { type: Number, default: 2 },
    gest2ref:           { type: Number, default: 2 },
    conc1ref:           { type: Number, default: 2 },
    conc2ref:           { type: Number, default: 2 },
    rel_notes:          { type: String, default: '' },
});

// Area Disciplinare
const disciplineSchema = new Schema({
    gest_discipline:    { type: Number, default: 3 },
    d_verbals:          { type: Number, default: 0 },
    d_officials:        { type: Number, default: 0 },
    d_penals:           { type: Number, default: 0 },
    d_expulsions:       { type: Number, default: 0 },
    d_squalifications:  { type: Number, default: 0 },
    discipline:         { type: Number, default: 2 },
    disc_interation:    { type: Number, default: 2 },
    delays1ref:         { type: Number, default: 2 },
    delays2ref:         { type: Number, default: 2 },
    disc_notes:         { type: String, default: '' },
});

// Colloquio
const interviewSchema = new Schema({
    interview1ref:      { type: Number, default: 2 },
    interview2ref:      { type: Number, default: 2 },
    interview_notes:    { type: String, default: '' }
});

// Eventi particolari
const eventsSchema = new Schema({
    finalvote1ref: { type: Number, default: 3 },
    finalvote2ref: { type: Number, default: 3 }
});

const reportsSchema = new Schema({
    general: generalSchema,
    match: matchSchema,
    image: imageSchema,
    technical: technicalSchema,
    relational: relationalSchema,
    discipline: disciplineSchema,
    interview: interviewSchema,
    events: eventsSchema,
    valid: { type: Boolean, default: false }
});

exports.Report = mongoose.model('Report', reportsSchema);