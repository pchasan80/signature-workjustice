document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signatureForm');
    const previewBox = document.getElementById('signaturePreview');
    const copyBtn = document.getElementById('copyBtn');
    const copyStatus = document.getElementById('copyStatus');

    const escapeHtml = (value) => {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };

    const normalizeEmail = (value) => String(value).trim();
    const normalizePhoneDigits = (value) => String(value).replace(/[^0-9+]/g, '');

    // Input elements
    const inputs = {
        fullName: document.getElementById('fullName'),
        jobTitle: document.getElementById('jobTitle'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        fax: document.getElementById('fax')
    };

    // Static Data
    const companyData = {
        name: "The Work Justice Firm",
        tagline: "Truck Wreck & Brain Injury Lawyers",
        address: "3530 Wilshire Blvd Suite 1460<br>Los Angeles, CA 90010",
        mapUrl: "https://www.google.com/maps?cid=5507243980465062835",
        website: "www.workjustice.com",
        websiteUrl: "https://www.workjustice.com/",
        logoUrl: "https://www.workjustice.com/images/brand/logo-dark.2503030826194.png",
        colors: {
            primary: "#002341", // Navy
            accent: "#dbb887",  // Gold
            text: "#343434",
            grey: "#666666"
        },
        social: {
            instagram: "https://www.instagram.com/workjusticefirm/",
            facebook: "https://facebook.com/workjustice",
            linkedin: "https://linkedin.com/company/workjustice",
            google: "https://www.google.com/maps?cid=5507243980465062835"
        }
    };

    // Icons (hosted on a reliable CDN or similar)
    const icons = {
        social: {
            linkedin: "https://cdn-icons-png.flaticon.com/512/61/61109.png",
            facebook: "https://cdn-icons-png.flaticon.com/512/20/20673.png",
            instagram: "https://cdn-icons-png.flaticon.com/512/87/87390.png",
            google: "https://cdn-icons-png.flaticon.com/512/126/126122.png"
        },
        contact: {
            phone: "https://cdn-icons-png.flaticon.com/512/483/483947.png",
            email: "https://cdn-icons-png.flaticon.com/512/542/542638.png",
            web: "https://cdn-icons-png.flaticon.com/512/1006/1006771.png",
            address: "https://cdn-icons-png.flaticon.com/512/535/535239.png",
            fax: "https://cdn-icons-png.flaticon.com/512/7175/7175143.png"
        }
    };

    function generateSignature() {
        const raw = {
            fullName: inputs.fullName.value || "Brent Marlis",
            jobTitle: inputs.jobTitle.value || "Partner, President",
            email: inputs.email.value || "brent@workjustice.com",
            phone: inputs.phone.value || "(323) 675-3337",
            fax: inputs.fax.value || ""
        };

        const emailNormalized = normalizeEmail(raw.email);
        const phoneDigits = normalizePhoneDigits(raw.phone);

        const safe = {
            fullName: escapeHtml(raw.fullName),
            jobTitle: escapeHtml(raw.jobTitle),
            email: escapeHtml(emailNormalized),
            phone: escapeHtml(raw.phone),
            fax: escapeHtml(raw.fax)
        };

        const logoHtml = `
            <td width="42%" style="width: 42%; vertical-align: top; padding-right: 20px; max-width: 250px;">
                <img src="${companyData.logoUrl}" alt="${companyData.name}" width="250" style="max-width: 250px; width: 100%; height: auto; border: 0; display: block;">
                <div style="margin-top: 15px; text-align: center;">
                    <a href="${companyData.social.linkedin}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; margin-right: 5px;">
                        <img src="${icons.social.linkedin}" alt="LinkedIn" width="20" height="20" style="display: inline-block;">
                    </a>
                    <a href="${companyData.social.facebook}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; margin-right: 5px;">
                        <img src="${icons.social.facebook}" alt="Facebook" width="20" height="20" style="display: inline-block;">
                    </a>
                    <a href="${companyData.social.instagram}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; margin-right: 5px;">
                        <img src="${icons.social.instagram}" alt="Instagram" width="20" height="20" style="display: inline-block;">
                    </a>
                    <a href="${companyData.social.google}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                        <img src="${icons.social.google}" alt="Google Business" width="20" height="20" style="display: inline-block;">
                    </a>
                </div>
            </td>
        `;

        // Helper for contact rows
        const contactRow = (icon, text, href) => {
            const isWebLink = typeof href === 'string' && /^https?:/i.test(href);
            const linkAttrs = isWebLink ? ' target="_blank" rel="noopener noreferrer"' : '';

            return `
            <tr>
                <td style="width: 20px; vertical-align: middle; padding-bottom: 5px;">
                    <img src="${icon}" width="14" height="14" style="display: block;">
                </td>
                <td style="vertical-align: middle; padding-bottom: 5px; padding-left: 8px; min-width: 0; word-break: break-word;">
                    ${href ? `<a href="${href}"${linkAttrs} style="color: ${companyData.colors.text}; text-decoration: none;">${text}</a>` : `<span style="color: ${companyData.colors.text};">${text}</span>`}
                </td>
            </tr>
        `;
        };

        const signatureHtml = `
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px; font-family: 'Montserrat', Arial, sans-serif; font-size: 14px; line-height: 1.4; color: ${companyData.colors.text}; border-collapse: collapse;">
                <tr>
                    ${logoHtml}
                    <td width="58%" style="width: 58%; vertical-align: top; min-width: 0;">
                        <div style="font-size: 18px; font-weight: bold; color: ${companyData.colors.primary}; margin-bottom: 4px;">
                            ${safe.fullName}
                        </div>
                        <div style="font-size: 14px; color: ${companyData.colors.grey}; font-style: italic; margin-bottom: 10px;">
                            ${safe.jobTitle}
                        </div>
                        
                        <div style="border-top: 2px solid ${companyData.colors.accent}; width: 50px; margin-bottom: 15px;"></div>

                        <table cellpadding="0" cellspacing="0" border="0" style="font-size: 13px; margin-bottom: 15px; width: 100%;">
                            ${contactRow(icons.contact.phone, safe.phone, `tel:${encodeURIComponent(phoneDigits)}`)}
                            ${raw.fax ? contactRow(icons.contact.fax, safe.fax, null) : ''}
                            ${contactRow(icons.contact.email, safe.email, `mailto:${encodeURIComponent(emailNormalized)}`)}
                            ${contactRow(icons.contact.web, companyData.website, companyData.websiteUrl)}
                            ${contactRow(icons.contact.address, companyData.address, companyData.mapUrl)}
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="padding-top: 0px;">
                        <p style="font-size: 10px; color: #999; line-height: 1.2; margin: 0; border-top: 1px solid #eee; padding-top: 10px;">
                            CONFIDENTIALITY NOTICE: This e-mail may contain or attach privileged, confidential or protected information intended only for the use of the intended recipient. If you are not the intended recipient, any review or use of it is strictly prohibited. If you have received this e-mail in error, you are required to notify the sender, then delete this email and any attachment from your computer and any of your electronic devices where the message is stored.
                        </p>
                    </td>
                </tr>
            </table>
        `;

        previewBox.innerHTML = signatureHtml;
    }

    // Phone formatting
    const formatPhoneNumber = (e) => {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    };

    inputs.phone.addEventListener('input', formatPhoneNumber);
    inputs.fax.addEventListener('input', formatPhoneNumber);

    // Event Listeners
    Object.values(inputs).forEach(input => {
        input.addEventListener('input', generateSignature);
    });

    copyBtn.addEventListener('click', async function() {
        const signatureHtml = previewBox.innerHTML;
        const signatureText = previewBox.textContent || '';

        try {
            if (navigator.clipboard && window.ClipboardItem) {
                const item = new ClipboardItem({
                    'text/html': new Blob([signatureHtml], { type: 'text/html' }),
                    'text/plain': new Blob([signatureText], { type: 'text/plain' })
                });
                await navigator.clipboard.write([item]);
            } else {
                const range = document.createRange();
                range.selectNodeContents(previewBox);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);

                const ok = document.execCommand('copy');
                window.getSelection().removeAllRanges();
                if (!ok) {
                    throw new Error('document.execCommand(\'copy\') returned false');
                }
            }

            copyStatus.style.color = "";
            copyStatus.textContent = "Signature copied to clipboard!";
            setTimeout(() => {
                copyStatus.textContent = "";
            }, 3000);
        } catch (err) {
            console.error('Unable to copy', err);
            copyStatus.textContent = "Failed to copy. Please select and copy manually.";
            copyStatus.style.color = "red";
        }
    });

    // Initial generation
    generateSignature();
});
