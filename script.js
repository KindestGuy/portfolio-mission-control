async function loadData() {
  try {
    const res = await fetch('./data.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const summary = document.getElementById('summary');
    const panels = document.getElementById('panels');
    const feed = document.getElementById('feed');
    const tasks = document.getElementById('tasks');
    const daily = document.getElementById('summary-daily');

    summary.innerHTML = `
      <h2>Portfolio Summary</h2>
      <table border="1" cellpadding="6" cellspacing="0">
        <tr>
          <th>Site</th>
          <th>Pages</th>
          <th>Tools</th>
          <th>Experiments</th>
          <th>Last Activity</th>
        </tr>
        ${(data.sites || []).map(site => `
          <tr>
            <td>${site.name || ''}</td>
            <td>${site.pages_shipped ?? ''}</td>
            <td>${site.tools_shipped ?? ''}</td>
            <td>${site.experiments ?? ''}</td>
            <td>${site.last_activity || ''}</td>
          </tr>
        `).join('')}
      </table>
    `;

    panels.innerHTML = `
      <h2>Site Panels</h2>
      ${(data.sites || []).map(site => `
        <div style="margin-bottom: 20px; padding: 10px; border: 1px solid #2aff91;">
          <h3>${site.name || ''}</h3>
          <p><strong>Priorities:</strong> ${(site.priorities || []).join(', ')}</p>
          <p><strong>WIP:</strong> ${(site.wip || []).join(', ')}</p>
          <p><strong>Shipped:</strong> ${(site.shipped || []).join(', ')}</p>
          <p><strong>Opportunities:</strong> ${(site.opportunities || []).join(', ')}</p>
        </div>
      `).join('')}
    `;

    feed.innerHTML = `
      <h2>Shipping Feed</h2>
      <ul>
        ${(data.shipping_feed || []).map(item => `
          <li>
            <strong>${item.timestamp || ''}</strong> -
            ${item.action || ''}
            ${item.link ? ` - <a href="${item.link}" target="_blank">inspect</a>` : ''}
            ${item.site ? ` (${item.site})` : ''}
          </li>
        `).join('')}
      </ul>
    `;

    tasks.innerHTML = `
      <h2>Task Queue</h2>
      <table border="1" cellpadding="6" cellspacing="0">
        <tr>
          <th>Task</th>
          <th>Impact</th>
          <th>Confidence</th>
          <th>Effort</th>
          <th>Status</th>
        </tr>
        ${(data.tasks || []).map(task => `
          <tr>
            <td>${task.task || ''}</td>
            <td>${task.impact ?? ''}</td>
            <td>${task.confidence ?? ''}</td>
            <td>${task.effort ?? ''}</td>
            <td>${task.status || ''}</td>
          </tr>
        `).join('')}
      </table>
    `;

    daily.innerHTML = `
      <h2>Daily Summary</h2>
      <p><strong>Did:</strong> ${data.daily_summary?.did || ''}</p>
      <p><strong>Changed:</strong> ${data.daily_summary?.changed || ''}</p>
      <p><strong>Worked:</strong> ${data.daily_summary?.worked || ''}</p>
      <p><strong>Next:</strong> ${data.daily_summary?.next || ''}</p>
    `;
  } catch (err) {
    document.getElementById('summary').innerHTML = `
      <h2>Error</h2>
      <pre>${err.message}</pre>
    `;
    console.error(err);
  }
}
