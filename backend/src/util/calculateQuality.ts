export function calculateQuality(data: QualityRequest) {
    var n = 0;
    data.door === true ? ++n : n + 0;
    data.engine === true ? ++n : n + 0;
    data.chassi === true ? ++n : n + 0;
    data.tire === true ? ++n : n + 0;
    data.window === true ? ++n : n + 0;
    data.ligh === true ? ++n : n + 0;
    data.seat === true ? ++n : n + 0;
    data.airbag === true ? ++n : n + 0;
    data.extra === true ? ++n : n + 0;
    data.eletric ? ++n : n + 0;
    return n;
}

export function resumeQuality(data: QualityRequest) {
    const n = calculateQuality(data);
    const cal = n * 10;
    return cal;
}

export function aQuality(data: QualityRequest) {
    const Approval = calculateQuality(data) === 10 ? true : false;
    return Approval;
}
