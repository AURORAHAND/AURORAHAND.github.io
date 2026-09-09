window.HELP_IMPROVE_VIDEOJS = false;

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (container && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');
    
    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');
    if (carouselVideos.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(e => {
                    console.log('Autoplay prevented:', e);
                });
            } else {
                video.pause();
            }
        });
    }, {
        threshold: 0.5
    });
    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

// -----------------------------------------------------------------------------
// Camera-ready project-page updates (CoRL 2026)
// -----------------------------------------------------------------------------
function updateAuroraCameraReadyPage() {
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
        descriptionMeta.setAttribute(
            'content',
            'AURORA is an active in-hand 3D reconstruction framework that uses uncertainty-driven reorientation and Ray-GPIS planning to expose unobserved object surfaces.'
        );
    }

    const authorMeta = document.querySelector('meta[name="author"]');
    if (authorMeta) {
        authorMeta.setAttribute('content', 'Feiyu Zhao, Yuetong Li, Chenxi Xiao');
    }

    const authorContainer = document.querySelector('.publication-authors');
    if (authorContainer) {
        authorContainer.innerHTML = `
            <span class="author-block">
                <a href="https://ferryrain.github.io/" target="_blank" rel="noopener noreferrer"><strong>Feiyu Zhao</strong></a><sup>†</sup>,
            </span>
            <span class="author-block">Yuetong Li<sup>†</sup>,</span>
            <span class="author-block">Chenxi Xiao<sup>*</sup></span>
            <div class="is-size-6" style="margin-top:4px;">
                <sup>†</sup> Equal contribution. <sup>*</sup> Corresponding author.
            </div>
            <div class="is-size-5" style="margin-top:8px; font-weight:700;">
                Conference on Robot Learning (CoRL) 2026
            </div>
        `;
    }

    const publicationLinks = document.querySelector('.publication-links');
    if (publicationLinks) {
        publicationLinks.innerHTML = `
            <span class="link-block">
                <a href="https://arxiv.org/abs/2609.08493"
                   target="_blank" rel="noopener noreferrer"
                   class="external-link button is-normal is-rounded is-dark">
                    <span class="icon"><i class="fas fa-file-pdf"></i></span>
                    <span>arXiv</span>
                </a>
            </span>
            <span class="link-block">
                <a href="https://github.com/FerryRain/Inhand_Activate"
                   target="_blank" rel="noopener noreferrer"
                   class="external-link button is-normal is-rounded is-dark">
                    <span class="icon"><i class="fab fa-github"></i></span>
                    <span>Code</span>
                </a>
            </span>
            <span class="link-block">
                <a href="https://youtu.be/Oirx3k4veTA"
                   target="_blank" rel="noopener noreferrer"
                   class="external-link button is-normal is-rounded is-dark">
                    <span class="icon"><i class="fab fa-youtube"></i></span>
                    <span>YouTube</span>
                </a>
            </span>
            <span class="link-block">
                <a href="https://www.bilibili.com/video/BV1v6bA6CEzz/"
                   target="_blank" rel="noopener noreferrer"
                   class="external-link button is-normal is-rounded is-dark">
                    <span class="icon"><i class="fas fa-play-circle"></i></span>
                    <span>Bilibili</span>
                </a>
            </span>
        `;
    }

    const exp2 = document.getElementById('exp2');
    if (exp2 && !exp2.dataset.cameraReadyUpdated) {
        exp2.dataset.cameraReadyUpdated = '1';

        const heading = exp2.querySelector('h2');
        if (heading) {
            heading.textContent = 'Experiment II — Comparison with Active and Non-active Baselines';
        }

        const intro = exp2.querySelector('.subtitle');
        if (intro) {
            intro.innerHTML = `
                We evaluate both <b>open-loop/non-active rotation strategies</b> and <b>active view-planning baselines</b>.
                The former tests whether closed-loop replanning improves reconstruction efficiency on the real robot,
                while the latter isolates the quality of the Ray-GPIS planner under a controlled paired benchmark.
            `;
        }

        const firstFigure = exp2.querySelector('figure');
        if (firstFigure) {
            firstFigure.insertAdjacentHTML('beforebegin', `
                <h3 style="margin:24px 0 8px; font-size:20px; font-weight:800; color:var(--text);">
                    A. Comparison with Non-active Baselines
                </h3>
                <p style="margin:0 0 14px; color:var(--muted); font-size:15px; line-height:1.65;">
                    Under the same fixed <b>30 s</b> manipulation budget, we compare AURORA with a predefined multi-axis schedule
                    and single-axis rotations. The temporal uncertainty and F@5 curves show whether actively selected rotations
                    expose informative surfaces more efficiently than open-loop motion schedules.
                </p>
            `);
        }

        exp2.insertAdjacentHTML('beforeend', `
            <h3 style="margin:30px 0 8px; font-size:20px; font-weight:800; color:var(--text);">
                B. Comparison with Active View-Planning Baselines
            </h3>
            <p style="margin:0 0 14px; color:var(--muted); font-size:15px; line-height:1.65;">
                To isolate planner performance from perception and tracking errors, we adapt <b>ActNeRF</b> and <b>PB-NBV</b>
                to the same in-hand reorientation setting and evaluate <b>120 paired simulation episodes</b> with ground-truth object poses
                and exact RGB–depth registration. All planners share the same observations, executable action space, NBV-to-action mapper,
                fusion backend, and evaluator. We report <b>F-AUC</b>, final <b>F@5</b>, planner <b>Corr.</b>, and planning time per step.
            </p>

            <div class="tableWrap">
                <div class="tableTitle">
                    <b>Table.</b> Active planner comparison over 120 paired simulation episodes.
                    F-AUC measures reconstruction quality over the full exploration process; Corr. is the Spearman agreement
                    between planner-estimated action rankings and realized geometric gains.
                </div>
                <div style="overflow:auto;">
                    <table>
                        <thead>
                            <tr>
                                <th>Method</th>
                                <th>F-AUC ↑</th>
                                <th>F@5 ↑</th>
                                <th>Corr. ↑</th>
                                <th>Time (s) ↓</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Adapted ActNeRF</td>
                                <td>0.87 ± 0.01</td>
                                <td>0.97 ± 0.01</td>
                                <td>0.16 ± 0.03</td>
                                <td>2.24 ± 0.02</td>
                            </tr>
                            <tr>
                                <td>Adapted PB-NBV</td>
                                <td>0.75 ± 0.02</td>
                                <td>0.85 ± 0.02</td>
                                <td>−0.36 ± 0.07</td>
                                <td>0.39 ± 0.02</td>
                            </tr>
                            <tr class="bold" style="border-top:1.5px solid var(--border);">
                                <td>Ray-GPIS (Ours)</td>
                                <td>0.90 ± 0.01</td>
                                <td>0.98 ± 0.01</td>
                                <td>0.47 ± 0.07</td>
                                <td>0.26 ± 0.02</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <p class="foot">
                <b>Summary.</b> Ray-GPIS achieves the strongest reconstruction performance and substantially higher planner correlation,
                showing that its scores more reliably rank executable actions according to their actual geometric gains.
                It also plans substantially faster than ActNeRF. Together with the non-active comparison above, these results show that
                AURORA benefits not only from closed-loop replanning, but also from selecting more informative reconstruction actions.
            </p>
        `);
    }

    const oldExp3 = document.getElementById('exp3');
    if (oldExp3 && !document.getElementById('exp4')) {
        oldExp3.id = 'exp4';
        oldExp3.classList.remove('exp3');
        oldExp3.classList.add('exp4');

        const oldHeading = oldExp3.querySelector('h2');
        if (oldHeading) {
            oldHeading.textContent = 'Experiment IV — Comparison with Single-View 3D Reconstruction Baselines';
        }

        const oldSubtitle = oldExp3.querySelector('.subtitle');
        if (oldSubtitle) {
            oldSubtitle.innerHTML = oldSubtitle.innerHTML.replace('high-resolutionclean', 'high-resolution clean');
        }

        const ablation = document.createElement('div');
        ablation.className = 'expBlock exp3';
        ablation.id = 'exp3';
        ablation.style.marginTop = '18px';
        ablation.innerHTML = `
            <h2>Experiment III — Ablation and Robustness Analysis</h2>
            <p class="subtitle">
                We evaluate two key components of Ray-GPIS through targeted ablations:
                <b>miss-ray interpolation</b>, which assigns anchors to rays without direct surface hits, and
                <b>receptive-field (RF) integration</b>, which aggregates uncertainty over a local neighborhood around each ray anchor.
            </p>

            <div class="tableWrap">
                <div class="tableTitle">
                    <b>Table.</b> Targeted robustness ablations. <b>Unseen R-AUC</b> measures recall AUC over initially unseen surfaces;
                    <b>Corr.</b> measures agreement between planner-score rankings and actual one-step F@5 gains.
                </div>
                <div style="overflow:auto;">
                    <table>
                        <thead>
                            <tr>
                                <th>Variant</th>
                                <th>Setting</th>
                                <th>Metric</th>
                                <th>Score</th>
                                <th>Δ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="5" style="text-align:left; font-weight:800; background:rgba(0,0,0,.025);">
                                    Finger occlusion — miss-ray interpolation
                                </td>
                            </tr>
                            <tr class="bold">
                                <td>Full Ray-GPIS</td>
                                <td>Finger occlusion</td>
                                <td>Unseen R-AUC ↑</td>
                                <td>0.5715</td>
                                <td>—</td>
                            </tr>
                            <tr>
                                <td>w/o miss-ray interpolation</td>
                                <td>Finger occlusion</td>
                                <td>Unseen R-AUC ↑</td>
                                <td>0.5498</td>
                                <td>−0.0217</td>
                            </tr>
                            <tr>
                                <td colspan="5" style="text-align:left; font-weight:800; background:rgba(0,0,0,.025); border-top:1.5px solid var(--border);">
                                    Pose errors (6° / 3 mm) — RF integration
                                </td>
                            </tr>
                            <tr class="bold">
                                <td>Full Ray-GPIS</td>
                                <td>Pose errors (6° / 3 mm)</td>
                                <td>Corr. ↑</td>
                                <td>0.5028</td>
                                <td>—</td>
                            </tr>
                            <tr>
                                <td>w/o RF integration</td>
                                <td>Pose errors (6° / 3 mm)</td>
                                <td>Corr. ↑</td>
                                <td>0.2724</td>
                                <td>−0.2304</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <p class="foot">
                <b>Summary.</b> Removing miss-ray interpolation reduces Unseen R-AUC under finger occlusion, confirming that interpolated anchors
                help the planner reason about persistently unobserved directions. Removing RF integration causes a substantially larger drop in
                planner correlation under pose perturbations, showing that local uncertainty aggregation stabilizes action ranking against small geometric misalignments.
            </p>
        `;

        oldExp3.parentNode.insertBefore(ablation, oldExp3);
    }
}

$(document).ready(function() {
    var options = {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
    }

    var carousels = bulmaCarousel.attach('.carousel', options);
    bulmaSlider.attach();
    setupVideoCarouselAutoplay();
    updateAuroraCameraReadyPage();
})
