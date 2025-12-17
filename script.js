document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signatureForm');
    const previewBox = document.getElementById('signaturePreview');
    const copyBtn = document.getElementById('copyBtn');
    const copyStatus = document.getElementById('copyStatus');

    // Input elements
    const inputs = {
        fullName: document.getElementById('fullName'),
        jobTitle: document.getElementById('jobTitle'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        fax: document.getElementById('fax'),
        photoUrl: document.getElementById('photoUrl')
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
        const data = {
            fullName: inputs.fullName.value || "Brent Marlis",
            jobTitle: inputs.jobTitle.value || "Partner, President",
            email: inputs.email.value || "brent@workjustice.com",
            phone: inputs.phone.value || "(323) 675-3337",
            fax: inputs.fax.value || "",
            photoUrl: inputs.photoUrl.value
        };

        let photoHtml = '';
        if (data.photoUrl) {
            photoHtml = `
                <td width="200" style="width: 200px; vertical-align: bottom;">
                    <img src="${data.photoUrl}" alt="${data.fullName}" width="180" style="width: 180px; height: auto; border-radius: 4px; object-fit: cover;">
                </td>
            `;
        }

        // Helper for contact rows
        const contactRow = (icon, text, href) => `
            <tr>
                <td style="width: 20px; vertical-align: middle; padding-bottom: 5px;">
                    <img src="${icon}" width="14" height="14" style="display: block;">
                </td>
                <td style="vertical-align: middle; padding-bottom: 5px; padding-left: 8px;">
                    ${href ? `<a href="${href}" style="color: ${companyData.colors.text}; text-decoration: none;">${text}</a>` : `<span style="color: ${companyData.colors.text};">${text}</span>`}
                </td>
            </tr>
        `;

        const signatureHtml = `
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="width: 600px; font-family: 'Montserrat', Arial, sans-serif; font-size: 14px; line-height: 1.4; color: ${companyData.colors.text};">
                <tr>
                    ${photoHtml}
                    <td width="400" style="width: 400px; vertical-align: top;">
                        <div style="font-size: 18px; font-weight: bold; color: ${companyData.colors.primary}; margin-bottom: 4px;">
                            ${data.fullName}
                        </div>
                        <div style="font-size: 14px; color: ${companyData.colors.grey}; font-style: italic; margin-bottom: 10px;">
                            ${data.jobTitle}
                        </div>
                        
                        <div style="border-top: 2px solid ${companyData.colors.accent}; width: 50px; margin-bottom: 15px;"></div>

                        <table cellpadding="0" cellspacing="0" border="0" style="font-size: 13px; margin-bottom: 15px;">
                            ${contactRow(icons.contact.phone, data.phone, `tel:${data.phone.replace(/[^0-9+]/g, '')}`)}
                            ${data.fax ? contactRow(icons.contact.fax, data.fax, null) : ''}
                            ${contactRow(icons.contact.email, data.email, `mailto:${data.email}`)}
                            ${contactRow(icons.contact.web, companyData.website, companyData.websiteUrl)}
                            ${contactRow(icons.contact.address, companyData.address, companyData.mapUrl)}
                        </table>

                        <div style="margin-bottom: 15px;">
                            <img src="${companyData.logoUrl}" alt="The Work Justice Firm" width="400" style="display: block; width: 50%; max-width: 50%; height: auto;">
                        </div>

                        <div style="margin-bottom: 5px;">
                            <a href="${companyData.social.linkedin}" style="text-decoration: none; margin-right: 5px;">
                                <img src="${icons.social.linkedin}" alt="LinkedIn" width="20" height="20" style="display: inline-block;">
                            </a>
                            <a href="${companyData.social.facebook}" style="text-decoration: none; margin-right: 5px;">
                                <img src="${icons.social.facebook}" alt="Facebook" width="20" height="20" style="display: inline-block;">
                            </a>
                            <a href="${companyData.social.instagram}" style="text-decoration: none; margin-right: 5px;">
                                <img src="${icons.social.instagram}" alt="Instagram" width="20" height="20" style="display: inline-block;">
                            </a>
                            <a href="${companyData.social.google}" style="text-decoration: none;">
                                <img src="${icons.social.google}" alt="Google Business" width="20" height="20" style="display: inline-block;">
                            </a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="${data.photoUrl ? 2 : 1}" style="padding-top: 0px;">
                        <p style="font-size: 10px; color: #999; line-height: 1.2; margin: 0; border-top: 1px solid #eee; padding-top: 10px;">
                            CONFIDENTIALITY NOTICE: This message is intended only for the named recipient and may contain confidential or privileged information.  It is protected by the Electronic Communications Privacy Act, 18 USC Sections 2150-21 and is legally privileged.  If you are not the named recipient, please delete this message and contact the sender at (323) 675-3337 or by reply email indicating that you received it in error.
                        </p>
                    </td>
                </tr>
            </table>
        `;

        previewBox.innerHTML = signatureHtml;
    }

    // Event Listeners
    Object.values(inputs).forEach(input => {
        input.addEventListener('input', generateSignature);
    });

    copyBtn.addEventListener('click', function() {
        // Select the signature content
        const range = document.createRange();
        range.selectNode(previewBox);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        try {
            // Execute copy command
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
            
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
